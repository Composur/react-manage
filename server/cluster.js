const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus().length;
if (cluster.isMaster) {
   // 启动的时候根据 CPU 的核心数开启多个进程
  for (let i = 0; i < cpus / 2 ; i++) {
  	 cluster.fork();
  }
} else {
  require("./server") // 启动 http 服务
}