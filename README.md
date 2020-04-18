# Travis CI持续集成使用

![img](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017121901.png)

用好这个工具不仅可以提高效率，还能使开发流程更可靠和专业化，从而提高软件的价值。而且，它对于开源项目是免费的，不花一分钱，就能帮你做掉很多事情。

## 一、什么是持续集成？

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。

持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码。

## 二、使用准备

Travis CI 只支持 Github，不支持其他代码托管服务。这意味着，你必须满足以下条件，才能使用 Travis CI。

```
1、拥有 GitHub 帐号
2、该帐号下面有一个项目
3、该项目里面有可运行的代码
4、该项目还包含构建或测试脚本
```

首先，访问官方网站 [travis-ci.org](https://travis-ci.org/)，使用 Github 账户登入 Travis CI，登录后右上角头像有settings，进入后会列出你有的repositories。以及你所属于的组织。此时，选择你需要 Travis 帮你构建的仓库，打开仓库旁边的开关。一旦激活了一个仓库，Travis 会监听这个仓库的所有变化。

**如果你是第一次使用的话推荐重新创建一个项目**

![projcet](https://raw.githubusercontent.com/mufengsm/aiqianduan9/master/travisCIProject.png)

### 2.1创建项目

创建一个带有git仓库的项目，相信这难不倒你

```shell
. 项目目录
├── .gitignore #不提交哪些文件到仓库
├── .jshintrc #是JSHint的一种配置方式,必须
├── .travis.yml #是指定 Travis 行为的,必须
├── hello.js #代码文件
├── hello.test.js #对应代码文件的测试文件
├── package.json
```

项目代码你可以在我的[github](https://github.com/mufengsm/travis-ci)上得到

## 三、.travis.yml

Travis 要求项目的根目录下面，必须有一个`.travis.yml`文件。这是配置文件，指定了 Travis 的行为。该文件必须保存在 Github 仓库里面，一旦代码仓库有新的 Commit，Travis 就会去找这个文件，执行里面的命令。

这个文件采用 [YAML](http://www.ruanyifeng.com/blog/2016/07/yaml.html) 格式。下面是一个最简单的Node项目的`.travis.yml`文件。

```yaml
# running on container-based infrastructure
sudo: false

language: node_js
node_js:
  - "node"
```

上面代码中，`language`字段指定了默认运行环境，这里设定使用 node 环境。

上面代码中，`node_js`字段用来指定 Node 版本，如果写node表示最新版本。

`sudo`字段为false代表不需要`sudo`权限

Travis 默认提供的运行环境，请参考[官方文档](https://docs.travis-ci.com/user/languages) 。目前一共支持31种语言，以后还会不断增加。

## 四、运行流程

Travis 的运行流程很简单，任何项目都会经过两个阶段。

> - install 阶段：安装依赖
> - script 阶段：运行脚本

### 4.1实例：Node 项目

Node 项目的`install`和`script`阶段都有默认脚本会自动执行，可以不写。

> - `install`默认值：npm install
> - `script`默认值：npm test

更多设置请看[官方文档](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)。

### 4.2 钩子方法

Travis 为上面这些阶段提供了7个钩子。

> - before_install：install 阶段之前执行
> - before_script：script 阶段之前执行
> - after_failure：script 阶段失败时执行
> - after_success：script 阶段成功时执行
> - before_deploy：deploy 步骤之前执行
> - after_deploy：deploy 步骤之后执行
> - after_script：script 阶段之后执行

完整的生命周期，从开始到结束是下面的流程。

> 1. before_install
> 2. install
> 3. before_script
> 4. script
> 5. after*success or after*failure
> 6. [OPTIONAL] before_deploy
> 7. [OPTIONAL] deploy
> 8. [OPTIONAL] after_deploy
> 9. after_script

下面是一个`before_install`钩子的例子在`.travis.yml`中书写。

> ```javascript
> before_install:
>   - sudo npm update koa
>   - sudo npm install express
> ```

上面代码表示`before_install`阶段要做两件事，第一件事是要更新依赖，第二件事是安装`express`。

## 五、提交项目

然后通过

```shell
git add ./
git commit -m "travisCI"
git push origin master
```

提交成功后，再到travis-cI官网查看结果就可以了，也可以看到它的执行过程。

---

参考文章：[http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)