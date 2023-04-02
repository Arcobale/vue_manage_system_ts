<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 20, 30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :url="url">
        </el-pagination>
    </div>
</template>

<script>
import { getWorkList } from '@/utils/table';
export default {
    data() {
        return {
            page: 1,
            size: 10,
        }
    },
    props: ['total', 'url'],
    mounted() {
        getWorkList(this.$parent, this.url, { page: this.page, size: this.size });
    },
    methods: {
        handleSizeChange(val) {
            this.size = val;
            this.page = 1;
            this.$parent.loading = true;
            getWorkList(this.$parent, this.url, { page: this.page, size: this.size });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.$parent.loading = true;
            getWorkList(this.$parent, this.url, { page: this.page, size: this.size });
        },
    }
}
</script>

<style lang="scss">
.el-pagination {
    text-align: left;
    margin-top: 20px;
}
</style>