<template>
  <div class="app-container">
    医院设置添加
      <el-form label-width="120px">
        <el-form-item label="医院名称">
            <el-input v-model="hospitalSet.hosname"/>
        </el-form-item>
        <el-form-item label="医院编号">
            <el-input v-model="hospitalSet.hoscode"/>
        </el-form-item>
        <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl"/>
        </el-form-item>
        <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName"/>
        </el-form-item>
        <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import hospset from '@/api/hospset'
export default {
  data(){
    return{
      hospitalSet:{}
    }
  },
  created(){
    //获取路由id值
    //调用接口得到医院信息

    if(this.$route.params && this.$route.params.id){
      const id = this.$route.params.id
      this.getHospSet(id)
    }else{
      //表单数据清空
      this.hospitalSet = {}
    }
  },
  methods: {
    getHospSet(id){
      hospset.getHospSet(id)
      .then(res => {
          this.hospitalSet = res.data
      })
    },
    //添加
    save(){
      hospset.saveHospSet(this.hospitalSet)
        .then(res => {
          //提示
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          //跳转页面
          this.$router.push({path:'/hospSet/list'})
        })
    },
    //修改
    update(){
      hospset.updateHospSet(this.hospitalSet)
        .then(res => {
          //提示
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          //跳转页面
          this.$router.push({path:'/hospSet/list'})
        })
    },
    saveOrUpdate(){
      //判断是添加还是修改
      if(!this.hospitalSet.id){
        this.save()
      }else{
        this.update()
      }
    }
  }
}
</script>
