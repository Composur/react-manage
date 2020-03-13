// 根据传进来的文件切片进行 hash 值的计算
export const calculateHash = (fileChunkList, setHashPercentage) => {
  return new Promise(resolve => {
   const  worker = new Worker("/hash.js");
    worker.postMessage({ fileChunkList });
    worker.onmessage = e => {
      const { percentage, hash } = e.data;
      setHashPercentage(percentage); // 计算总文件的 hash
      if (hash) {
        resolve(hash); // 每个切片的 hash
      }
    };
  });
};

// 文件切片
export const createFileChunk = (file,size) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList
};