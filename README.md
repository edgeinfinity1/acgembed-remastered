# ACGEmbd-Remastered

本插件对 [lcinhk/flarum-ext-acgembed](https://github.com/LCinHK/flarum-ext-acgembed) 做出一点修改，包括：

1. 调整版本号使其可以安装在正式版以后
2. 调整部分嵌入摆件的大小，以适配文字总宽度
3. 新增移动端网易云音乐 iframe 适配：根据浏览器 UA 在移动端自动使用 `music.163.com/m/outchain`
4. 将前端代码按 Flarum 扩展惯例拆分为 `js/src`（源码）与 `js/dist`（产物）

---

具体使用参考 [这里](https://discuss.flarum.org.cn/d/1559) ，这里不做赘述。

---

### 安装

```bash
composer require zequeen/acgembed-remarstered
```

### 更新

```bash
composer update zequeen/acgembed-remarstered
php flarum cache:clear
```

### 前端开发与编译

前端源码位于 `js/src/forum/index.js`，发布产物位于 `js/dist/forum.js`。

```bash
cd js
npm install
npm run build
```

开发模式（监听改动）：

```bash
npm run dev
```

编译后请执行：

```bash
php flarum cache:clear
```
