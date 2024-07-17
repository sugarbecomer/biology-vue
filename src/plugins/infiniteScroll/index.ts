import type {App} from "vue";

import ElTableInfiniteScroll from "el-table-infinite-scroll";

export const setupInfiniteScroll = (app: App<Element>) => {
    app.use(ElTableInfiniteScroll)
}