const fse = require('fs-extra')
const multiparty = require("multiparty");
const path = require('path');
// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); 
 // 提取后缀名
const extractExt = filename =>filename.slice(filename.lastIndexOf("."), filename.length);
// 移除后缀名
const extractRemove = filename =>filename.slice(0, filename.lastIndexOf("."));


const verify = function(req,res){
  const {filename,fileHash} = req.body
  const filePath = path.resolve(UPLOAD_DIR,fileHash+extractExt(filename))

  // 文件存在不上传
  if(fse.existsSync(filePath)){
    res.send({status:1,shouldUpload:false})
  }else {
    res.send({status:0,shouldUpload:true})
  }
  return
}

const upload =  function(req, res) {
  const multipart = new multiparty.Form();
  // fields: 其它formData字段
  // files：二进制文件
  multipart.parse(req, async (err, fileds, files) => {
    if (err) return;
    const [chunk] = files.chunk;
    const [hash] = fileds.hash;
    const [filename] = fileds.filename;
    const [fileHash] = fileds.fileHash;
    const chunkDir = path.resolve(UPLOAD_DIR,fileHash);
    const filePath = path.resolve(
      UPLOAD_DIR,
      `${fileHash}${extractExt(filename)}`
    );
    // 文件切片存在直接返回
    if (fse.existsSync(filePath)) {
      res.end("file exist");
      return;
    }
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirp(chunkDir);
    }
    await fse.move(chunk.path, path.resolve(chunkDir, hash));
    res.send({ status: 0,msg: "上传成功" });
  });
}
const pipeStream =  (path, writeStream) =>
  new Promise(  resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

const mergeFileChunk = async (filePath, fileHash, size) => {
  // 找到文件夹 文件路径
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
   // 遍历文件夹里面的切片名
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};
const mergeFile = async function(req,res){
  let {filename,size,fileHash} = req.body
  const ext = extractExt(filename);
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
  await mergeFileChunk(filePath,fileHash,size);
  res.send({ status: 0, msg: "合并完成" });
}
module.exports = {
  verify,
  upload,
  mergeFile,
};
