/**
 * @param {Object} config 请求配置
 * @param {dependencies} dependencies
 * @returns {Array}
 */
export default (config, dependencies) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    Axios.request(config)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [dependencies]);

  return [{ data, loading, error }];
};
