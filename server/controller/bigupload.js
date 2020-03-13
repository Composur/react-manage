const fse = require('fs-extra')
const multiparty = require("multiparty");
const path = require('path');
// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); 
 // 提取后缀名
const extractExt = filename =>filename.slice(filename.lastIndexOf("."), filename.length);
// 移除后缀名
const extractRemove = filename =>filename.slice(0, filename.lastIndexOf("."));

const upload =  function(req, res) {
  const multipart = new multiparty.Form();
  // fields: 其它formData字段
  // files：二进制文件
  multipart.parse(req, async (err, fileds, files) => {
    if (err) return;
    const [chunk] = files.chunk;
    const [hash] = fileds.hash;
    const [filename] = fileds.filename;
    const chunkDir = path.resolve(UPLOAD_DIR);
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirp(chunkDir);
    }
    // else{
    //   await fse.readdir(chunkDir,(err,files)=>{
    //     if(err) {
    //       res.send({ status: 1,msg: "error" });
    //       return
    //     }
    //     files.forEach(item=>{
    //       if(item===filename){
    //         res.send({ status: 1,msg: "文件已存在" });
    //         return
    //       }
    //     })
    //     return
    //   })
    // }
    await fse.move(chunk.path, path.resolve(chunkDir, hash));
    res.send({ status: 0,msg: "上传成功" });
  });
}
const pipeStream = (path,writeStream,filename)=>{
  return new Promise(resolve=>{
    const readStream = fse.createReadStream(path)
    const pathHash = path.slice(path.length-2)
    readStream.on('end',()=>{
      if(/^-[0-9]$/.test(pathHash)){
        fse.unlinkSync(path) // 删除读过的切片
      }
      resolve()
    })
    readStream.pipe(writeStream)
  })
}
// 合并切片
const mergeFileChunk = async (filePath,filename,size)=>{
  // 找到文件夹 文件路径
  const chunkDir = path.resolve(UPLOAD_DIR)
  // 遍历文件夹里面的切片
  const chunkPaths = await fse.readdir(chunkDir)
  // 对文件名排序 xx0.jpg,xx1.jpg ...
  chunkPaths.sort((a,b)=> a.split('-')[1] - b.split('-')[1])
  // 创建可读流
  await Promise.all(
    chunkPaths.map((chunkPath, index)=>{
      pipeStream(path.resolve(chunkDir,chunkPath),fse.createWriteStream(filePath,{
        start:index * size,
        end: (index + 1) * size
      }),filename)
    })
  )
}
const mergeFile = async function(req,res){
  let {filename,size} = req.body
  const filePath = (path.resolve(UPLOAD_DIR,(filename)));
  await mergeFileChunk((filePath),(filename),size);
  res.send({ status: 0, msg: "合并完成" });
}
module.exports = {
  upload,
  mergeFile,
};
