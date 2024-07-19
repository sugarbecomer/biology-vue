export default {
  common: {
    name: "简体中文",
    systemName: "生信管理系统",
    logout: "退出登录",
    needLogin: "请先登录",
    welcome: "欢迎您，",
    table: {
      emptyText: "暂无数据",
      operation: "操作",
    },
    button: {
      query: "搜索",
      reset: "重置",
      add: "新增",
      update: "修改",
      delete: "删除",
      confirm: "确定",
    },
    loadingText: "数据正在加载中...",
    delConfirm: "确定删除[name]的数据吗？",
  },
  // 消息的文字提示
  message: {
    success: "操作成功！",
  },
  components: {
    inputTag: {
      add: "新增",
    },
  },
  // 登录页面文字
  login: {
    username: "请输入用户名",
    usernameValid: "用户名不能为空",
    password: "请输入密码",
    passwordValid: "密码不能为空",
    button: "登 录",
    registerTip: "还没有账号？",
    registerButton: "立即注册",
  },
  // 注册页面文字
  register: {
    username: "请输入用户名",
    usernameValid: "用户名不能为空",
    password: "请输入密码",
    passwordValid: "密码不能为空",
    button: "注 册",
    loginTip: "已有账号？",
    loginButton: "立即登录",
  },
  // 基因管理页面文字
  strain: {
    list: {
      search: {
        label: "查询数据:",
        placeholder: "可搜索任意字段的数据",
      },
      table: {
        number: "序号",
        short_name: "简称",
        strain_name: "品系名",
        allele_name: "基因名",
        allele_genome: "基因修饰情况",
        strain_annotate: "品系注解",
      },
      add: {
        title: "新增品系",
      },
      update: {
        title: "修改品系",
      },
    },
    dialog: {
      number: {
        label: "序号",
        placeholder: "请输入序号",
      },
      strain_name: {
        label: "品系名",
        placeholder: "请输入品系名",
      },
      short_name: "简称",
      strain_annotate: "注释",
      strain_extra: "额外信息",
      strain_extra_title: "编辑额外信息",
      strain_extra_key: "额外信息名",
      strain_extra_value: "额外信息值",
      strain_extra_default1: "作者",
      strain_extra_default2: "时间",
      allele: "基因信息",
      allele_name: {
        label: "基因名",
        placeholder: "请输入基因名",
      },
      allele_genome: {
        label: "基因修饰情况",
        placeholder: "请输入基因修饰情况",
      },
    },
  },
};
