## mixin
```
是一种简化代码的方法，能够提高代码的重复使用率。
允许我们在项目中复用样式片段，可以传递参数这个特性使得它们非常灵活，强大。
使用 @mixin 定义。
使用 @include 引用。
参数变量（...）也可以在@include引用混合器的时候，将值列表中的值逐条作为参数引用

$base: 14px, #fff;
.text-base {
  @include text-config($base...);
}

在Mixin中，添加 @content; 语句，然后传递的样式片段就会代替 @content ;出现在相应的位置。

@mixin button {
  font-size: 1em;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #fff;
  @content;
}
.button-green {
  @include button {
    background: green;
  }
}
```

## extend
```
使用@extend命令让一个选择器继承其它选择器去复用样式片段。


```

## v-deep
```
Vue 2.0 写法
::v-deep .carousel-btn.prev {
    left: 270px;
}

vue3 写法
::v-deep(.el-icon){
    height: inherit;
}
 
或
 
:deep(.el-icon){
    height: inherit;
}
```
