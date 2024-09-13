### 简介

每个实验室的管理都难以避免的一个问题是实验动物信息的记录。尤其是当实验室保存的品系过多、实验室人员操作多，单纯的纸质或者 excel 表格难以维护，更无法解决同步和远程的问题。因此解决实验室品系记录是一个迫在眉睫的问题。

这是一个本意对应于动物品系存储数据库的前端页面，拥有动物品系存储数据库所需要的特定页面，如果有其他特殊需求，可以自行修改。

支持多国语言(i18n)

目前对接的后端为:https://github.com/linpanic/biology-server 可以直接使用

### 使用技术

Vite5 (构建工具)

Vue3.4 (前端主要框架)

element-plus (UI)

vue-i18n (国际化)

unocss sass (css 框架)

### 启动方式

```shell
pnpm i
pnpm dev
```

或者

```shell
npm i
npm run dev
```

### 接口文档

### 一：用户

#### 1：注册

##### Post http://127.0.0.1:10080/register

##### Request

|   参数   | 类型   | 必填 | 说明                              |
| :------: | ------ | ---- | --------------------------------- |
| username | string | 是   | 用户名                            |
| password | string | 是   | 密码                              |
|   time   | int    | 是   | 10 位数字时间戳                   |
|   sign   | string | 是   | MD5(username+time+password)转大写 |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 2：登陆

##### Post http://127.0.0.1:10080/login

##### Request

|   参数   | 类型   | 必填 | 说明                                                               |
| :------: | ------ | ---- | ------------------------------------------------------------------ |
| username | string | 是   | 用户名                                                             |
| password | string | 是   | MD5(MD5(密码))转大写                                               |
|   time   | int    | 是   | 10 位数字时间戳                                                    |
|   sign   | string | 是   | MD5(username+time+password)转大写,这里的 password 为 2 次 MD5 后的 |

##### Response

|    参数    | 类型   | 必填 | 说明                   |
| :--------: | ------ | ---- | ---------------------- |
|    code    | int    | 是   | 200 为成功，其他为失败 |
|  message   | string | 是   | 消息内容               |
|    data    | object | 是   | 数据                   |
| data.token | string | 是   | token                  |

### 以下所有请求都需要在 http header 带上 x-token 字段,值为返回的 data.token

#### 3：修改密码(todo)

##### Post http://127.0.0.1:10080/change_password

##### Request

|     参数     | 类型   | 必填 | 说明                                      |
| :----------: | ------ | ---- | ----------------------------------------- |
| old_password | string | 是   | 旧密码                                    |
| new_password | string | 是   | 新密码                                    |
|     time     | int    | 是   | 10 位数字时间戳                           |
|     sign     | string | 是   | MD5(old_password+time+new_password)转大写 |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

### 二：品系

#### 1:新增品系名

##### Post http://127.0.0.1:10080/biology/strain_add

##### Request

|           参数           | 类型          | 必填 | 说明                                         |
| :----------------------: | ------------- | ---- | -------------------------------------------- |
|       strain_name        | string        | 否   | 品系名，可能为空                             |
|          number          | string        | 是   | 品系序列号，序列号需要从接口获取             |
|        short_name        | array(string) | 否   | 简称，一个品系可能对应多个简称               |
|         annotate         | array(string) | 否   | 品系名注解， 一个品系可能对应多个注解        |
|          extra           | array(object) | 否   | 品系额外信息，一个品系可能对应多个额外信息   |
|     extra.extra_key      | string        | 否   | 品系额外信息 key                             |
|    extra.extra_value     | string        | 否   | 品系额外信息 value                           |
|          allele          | array(object) | 否   | 基因,一个品系可能对应多个基因                |
|       allele.name        | string        | 否   | 基因名                                       |
|     allele.annotate      | array(string) | 否   | 基因注解，一个基因可能对应多个注解           |
|      allele.genome       | string        | 否   | 基因修饰情况                                 |
|      allele.serial       | string        | 否   | 对应第几条染色体，一般为罗马数字             |
|       allele.extra       | array(object) | 否   | 基因的额外信息，一个基因可能对应多个额外信息 |
|  allele.extra.extra_key  | string        | 否   | 基因的额外信息 key                           |
| allele.extra.extra_value | string        | 否   | 基因的额外信息 value                         |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 2：展示品系名列表

##### Post http://127.0.0.1:10080/biology/strain_list

##### Request

|   参数    | 类型   | 必填 | 说明                             |
| :-------: | ------ | ---- | -------------------------------- |
|  page_no  | int    | 否   | 查询第几页，默认 1               |
| page_size | int    | 否   | 每页查询数量，默认 10            |
|   field   | string | 否   | 查询条件，可为空                 |
|   order   | string | 否   | 查询条件的降序/升序排列 desc/asc |
|    key    | string | 否   | 查询关键词                       |

##### Response

|             参数              | 类型          | 必填 | 说明                                           |
| :---------------------------: | ------------- | ---- | ---------------------------------------------- |
|            page_no            | int           | 是   | 第几页                                         |
|           page_size           | int           | 是   | 每页数量                                       |
|             total             | int           | 是   | 总条数                                         |
|             data              | object        | 是   | 数据                                           |
|       data.strain_list        | array(object) | 是   | 品系列表                                       |
|     strain_list.strain_id     | int           | 是   | 品系 ID                                        |
|       strain_list.name        | string        | 否   | 品系名，可能为空                               |
|      strain_list.number       | string        | 是   | 序列号，一般#开头                              |
|    strain_list.short_name     | array(string) | 否   | 简称，一个品系可能对应                         |
|     strain_list.annotate      | array(string) | 否   | 品系注解， 一个品系可能对应多个注解            |
|       strain_list.extra       | array(object) | 否   | 品系的额外信息，一个品系可能对应多个额外信息   |
|  strain_list.extra.extra_key  | string        | 是   | 品系额外信息 key                               |
| strain_list.extra.extra_value | string        | 是   | 品系额外信息 value                             |
|      strain_list.allele       | array(object) | 否   | 基因，一个品系可能对应多个基因，品系名可能为空 |
|           allele.id           | int           | 否   | 基因 ID                                        |
|          allele.name          | string        | 否   | 基因名                                         |
|        allele.annotate        | array(string) | 否   | 基因注解，一个基因可能对应多个注解             |
|         allele.genome         | string        | 否   | 基因修饰情况                                   |
|         allele.serial         | string        | 否   | 对应第几条染色体，一般为罗马数字               |
|         allele.extra          | array(object) | 否   | 基因的额外信息，一个基因可能对应多个额外信息   |
|    allele.extra.extra_key     | string        | 是   | 基因的额外信息 key                             |
|   allele.extra.extra_value    | string        | 是   | 基因的额外信息 value                           |

#### 3：修改品系数据

##### Post http://127.0.0.1:10080/biology/strain_update

##### Request

|           参数           | 类型                      | 必填 | 说明                                       |
| :----------------------: | ------------------------- | ---- | ------------------------------------------ | --- |
|            id            | int                       | 是   | 品系 ID                                    |
|       strain_name        | stri![img.png](img.png)ng | 否   | 品系名，可能为空                           |
|          number          | string                    | 否   | 品系序列号                                 |
|        short_name        | array(string)             | 否   | 简称，一个品系可能对应多个简称             |
|     strain_annotate      | array(string)             | 否   | 品系名注解， 一个品系可能对应多个注解      |
|       strain_extra       | array(object)             | 否   | 品系额外信息，一个品系可能对应多个额外信息 |
|  strain_extra.extra_key  | string                    | 是   | 品系额外信息 key                           |
| strain_extra.extra_value | string                    | 是   | 品系额外信息 value                         |     |
|          allele          | array(object)             | 否   | 基因,一个品系可能对应多个基因              |
|        allele.id         | int                       | 否   | 基因 ID                                    |
|       allele.name        | string                    | 否   | 基因名                                     |
|     allele.annotate      | array(string)             | 否   | 基因注解，一个基因可能对应多个注解         |
|      allele.genome       | string                    | 否   | 基因修饰情况                               |
|      allele.serial       | string                    | 否   | 对应第几条染色体，一般为罗马数字           |
|       allele.extra       | array(object)             | 否   | 基因额外信息，一个基因可能对应多个额外信息 |
|  allele.extra.extra_key  | string                    | 是   | 基因额外信息 key                           |
| allele.extra.extra_value | string                    | 是   | 基因额外信息 value                         |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 4：删除品系数据

##### Post http://127.0.0.1:10080/biology/strain_delete

##### Request

|   参数    | 类型 | 必填 | 说明    |
| :-------: | ---- | ---- | ------- |
| strain_id | int  | 是   | 品系 ID |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 5：获取序列号

##### Post http://127.0.0.1:10080/biology/get_number

##### Request

| 参数 | 类型   | 必填 | 说明                     |
| :--: | ------ | ---- | ------------------------ |
| time | int    | 是   | 10 位时间戳              |
| sign | string | 是   | 10 位时间戳的 MD5 转大写 |

##### Response

|    参数     | 类型   | 必填 | 说明                   |
| :---------: | ------ | ---- | ---------------------- |
|    code     | int    | 是   | 200 为成功，其他为失败 |
|   message   | string | 是   | 消息内容               |
|    data     | object | 是   | 数据                   |
| data.number | string | 是   | 序列号                 |

#### 6：修改基因数据

##### Post http://127.0.0.1:10080/biology/allele_update

##### Request

|          参数          | 类型          | 必填 | 说明                                       |
| :--------------------: | ------------- | ---- | ------------------------------------------ |
|           Id           | int           | 是   | 品系 ID                                    |
|         allele         | array(object) | 否   | 基因,一个品系可能对应多个基因              |
|       allele.id        | int           | 否   | 基因 ID                                    |
|      allele.name       | string        | 否   | 基因名                                     |
|    allele.annotate     | array(string) | 否   | 基因注解，一个基因可能对应多个注解         |
|     allele.genome      | string        | 否   | 基因修饰情况                               |
|     allele.serial      | string        | 否   | 对应第几条染色体，一般为罗马数字           |
|      allele.extra      | array(object) | 否   | 基因额外信息，一个基因可能对应多个额外信息 |
| allele.extra.extra_key | string        | 是   | 基因额外信息 key                           |
| allele.extra.extra_val | string        | 是   | 基因额外信息 value                         |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 7：搜索基因列表

##### Post http://127.0.0.1:10080/biology/allele_search

##### Request

| 参数 | 类型   | 必填 | 说明   |
| :--: | ------ | ---- | ------ |
| name | string | 否   | 基因名 |

##### Response

|     参数      | 类型          | 必填 | 说明                             |
| :-----------: | ------------- | ---- | -------------------------------- |
|     code      | int           | 是   | 200 为成功，其他为失败           |
|    message    | string        | 是   | 消息内容                         |
|     data      | object        | 是   | 基因数据                         |
|  data.allele  | array(object) | 否   | 基因,一个品系可能对应多个基因    |
|   allele.id   | int           | 否   | 基因 ID                          |
|  allele.name  | string        | 否   | 基因名                           |
| allele.genome | string        | 否   | 基因修饰情况                     |
| allele.serial | string        | 否   | 对应第几条染色体，一般为罗马数字 |

### 三：基因

#### 1：基因查询

##### Request

##### Post http://127.0.0.1:10080/biology/allele_list

|   参数    | 类型   | 必填 | 说明                             |
| :-------: | ------ | ---- | -------------------------------- |
|  page_no  | int    | 否   | 查询第几页，默认 1               |
| page_size | int    | 否   | 每页查询数量，默认 10            |
|   field   | string | 否   | 查询条件，可为空                 |
|   order   | string | 否   | 查询条件的降序/升序排列 desc/asc |
|    key    | string | 否   | 查询关键词                       |

##### Response

|       参数        | 类型          | 必填 | 说明                                           |
| :---------------: | ------------- | ---- | ---------------------------------------------- |
|      page_no      | int           | 是   | 第几页                                         |
|     page_size     | int           | 是   | 每页数量                                       |
|       total       | int           | 是   | 总条数                                         |
|       data        | object        | 是   | 基因数据                                       |
|    data.allele    | array(object) | 否   | 基因，一个品系可能对应多个基因，品系名可能为空 |
|     allele.id     | int           | 否   | 基因 ID                                        |
|    allele.name    | string        | 否   | 基因名                                         |
|  allele.annotate  | array(string) | 否   | 基因注解，一个基因可能对应多个注解             |
|   allele.genome   | string        | 否   | 基因修饰情况                                   |
|   allele.serial   | string        | 否   | 对应第几条染色体，一般为罗马数字               |
|       extra       | array(object) | 否   | 基因的额外信息，一个基因可能对应多个额外信息   |
|  extra.extra_key  | string        | 是   | 基因的额外信息 key                             |
| extra.extra_value | string        | 是   | 基因的额外信息 value                           |

#### 2：新增基因

##### Request

##### Post http://127.0.0.1:10080/biology/allele_add

|       参数        | 类型          | 必填 | 说明                                         |
| :---------------: | ------------- | ---- | -------------------------------------------- |
|       name        | string        | 否   | 基因名                                       |
|     annotate      | array(string) | 否   | 基因注解，一个基因可能对应多个注解           |
|      genome       | string        | 否   | 基因修饰情况                                 |
|      serial       | string        | 否   | 对应第几条染色体，一般为罗马数字             |
|       extra       | array(object) | 否   | 基因的额外信息，一个基因可能对应多个额外信息 |
|  extra.extra_key  | string        | 是   | 基因的额外信息 key                           |
| extra.extra_value | string        | 是   | 基因的额外信息 value                         |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 3：修改基因

##### Request

##### Post http://127.0.0.1:10080/biology/allele_update

|       参数        | 类型          | 必填 | 说明                                         |
| :---------------: | ------------- | ---- | -------------------------------------------- |
|        id         | int           | 是   | 基因 ID                                      |
|       name        | string        | 否   | 基因名                                       |
|     annotate      | array(string) | 否   | 基因注解，一个基因可能对应多个注解           |
|      genome       | string        | 否   | 基因修饰情况                                 |
|      serial       | string        | 否   | 对应第几条染色体，一般为罗马数字             |
|       extra       | array(object) | 否   | 基因的额外信息，一个基因可能对应多个额外信息 |
|  extra.extra_key  | string        | 是   | 基因的额外信息 key                           |
| extra.extra_value | string        | 是   | 基因的额外信息 value                         |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |

#### 4：删除基因

##### Request

##### Post http://127.0.0.1:10080/biology/allele_delete

| 参数 | 类型 | 必填 | 说明    |
| :--: | ---- | ---- | ------- |
|  id  | int  | 是   | 基因 ID |

##### Response

|  参数   | 类型   | 必填 | 说明                   |
| :-----: | ------ | ---- | ---------------------- |
|  code   | int    | 是   | 200 为成功，其他为失败 |
| message | string | 是   | 消息内容               |
