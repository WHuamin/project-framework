<template>
  <div>login</div>
</template>
<script>
import { getImageCode } from '@/api/auth';
export default {
  name: 'project-login',
  mounted() {
    getImageCode().then((res) => {
      console.log(res);
    });
  }
};
</script>
