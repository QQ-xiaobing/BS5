<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="items"> 
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>      
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height:3rem;">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row._id)">  </el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row._id)"> </el-button>
                </template>
            </el-table-column>
        </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 15, 20,25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" 
      background>
    </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:[],
             //总条目数
                 total:0,
              //用于模糊查询参数
              query:'',
              //当前页数
              pageNum:1 ,
              //每页显示条目数
              pageSize:10,
      
            };
        },
        methods: {    
            //  资源列表
            async fetch() {
                const res = await this.$http.get(`rest/items?pageNum=${this.pageNum}&pageSize=${this.pageSize}&query=${this.query}`);
                this.items = res.data.items;
                this.total=res.data.count;
            },
             //编辑
            edit(id) {
            this.$router.push(`/item/edit/${id}`);
             },
            //删除资源
            del(id) {
                    this.$confirm("确认删除吗？", "提示", {
                    confirmButtonText:  "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async () => {
                    await this.$http.delete(`rest/item/${id}`);
                    this.$message({
                        type: "success",
                        message: "删除成功!"});
                    this.fetch();
                });
            },
             handleSizeChange(newSize){
            this.pageSize=newSize
            this.fetch()
        },
         handleCurrentChange(newPage){
            this.pageNum=newPage
            this.fetch()
        },
        },
        created(){
            this.fetch();
        },
    };
</script>

