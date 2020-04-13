import React, { useState, useCallback, useEffect, useMemo, memo } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { reqSuggestCityData } from "../../../api";
import "./index.css";

const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;

  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CitySection = memo(function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
});

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;

  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// 返回 26 个字母的 ascii 的字符串表示
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const alphabet = Array.from(new Array(26), (ele, index) => {
  // fromCharCode 返回由指定的UTF-16代码单元序列创建的字符串
  return String.fromCharCode(65 + index);
});
const CityList = memo(function CityList(props) {
  const { sections, toAlpha, onSelect } = props;
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
});

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

// 城市搜索
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props;

  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// 搜索列表
const Suggest = memo(function Suggest(props) {
  const { searchKey, onSelect } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    const getSuggestData = async () => {
      const { data } = await reqSuggestCityData({ searchKey });
      const { searchKey: skey } = data;
      if (skey === searchKey) {
        // 避免因网络请求的快慢返回的请求与相应的结果不一致
        setResult(data.result);
      }
    };
    getSuggestData();
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey
        }
      ];
    }

    return result;
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
});

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CitySelector = memo(function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading,
    hideCitySelector,
    fetchCityData,
    onSelect
  } = props;
  // 搜索框值
  const [searchKey, setSearchKey] = useState("");

  // 性能优化 searchKey 改变才进行trim
  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }

    fetchCityData();
  }, [show, cityData, isLoading]);

  // 锚点
  const toAlpha = useCallback(alpha => {
    // scrollIntoView 让当前的元素滚动到浏览器窗口的可视区域内
    // 实验功能
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  }, []);

  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>;
    }

    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }

    return <div>error</div>;
  };
  return (
    // classnames 是一个函数接收任意数量的参数，和下面filter写法返回相似
    <div className={classnames("city-selector", { hidden: !show })}>
      {/* <div className={['city-selector',!show && 'hidden'].filter(Boolean).join(' ')} > */}
      <div className="city-search">
        <div className="search-back" onClick={() => hideCitySelector()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        {/* 初始化输入框值 */}
        <i
          onClick={() => setSearchKey("")}
          className={classnames("search-clean", {
            hidden: key.length === 0
          })}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
});

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hideCitySelector: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CitySelector;
