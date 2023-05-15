<template>
  <el-container>
    <el-header>NABER BLOCK</el-header>

    <el-container>
      <el-aside>
        SIDE BLOCK 

        <el-menu
          unique-opened
          mode="vertical"
          @select="handleSelet"
        >
          <el-menu-item index="url-index">
            <router-link to="/">Index</router-link>
          </el-menu-item>

          <el-menu-item index="url-sample01">
            <router-link to="/sample01">Sample01</router-link>
          </el-menu-item>

          <el-menu-item index="url-about">
            <router-link to="/about">About</router-link>
          </el-menu-item>

          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="Group Three">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-menu>


      </el-aside>
      <el-main>MAIN BLOCK</el-main>
    </el-container>

    <el-footer>FOOTER BLOCK</el-footer>

  </el-container>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'sample01',
    components: {
      HelloWorld,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      handleSelet (key, path) {
        console.log('key >>> ', key, path)
      },
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
  };
</script>
