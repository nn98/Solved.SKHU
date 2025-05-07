module.exports = {
  apps: [{
    name: "server",
    script: "/home/ubuntu/solved.SKHU/server/server.js", // 절대 경로 사용
    instances: "max",
    exec_mode: "cluster",      // 반드시 "cluster"로 명시
    watch: true,
    ignore_watch: ["node_modules", "logs"],
    max_memory_restart: "300M",
    env: {
      NODE_ENV: "production"
    }
  }]
}
