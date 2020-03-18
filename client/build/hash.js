// /public/hash.js
self.importScripts("/spark-md5.min.js"); // 导入脚本

// 根据文件的内容生成文件 hash 就算修改用户名依旧可以判断是否是同一个文件，hash 值是唯一的
self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        // 递归计算下一个切片
        loadNext(count);
      }
    };
  };
  loadNext(0);
};
