## 插槽slot
```
1. 插槽的使用过程其实是抽取共性、预留不同；
2. 我们会将共同的元素、内容依然在组件内进行封装；
3. 同时会将不同的元素使用slot作为占位，让外部决定到底显示什么样的元素；
4. 在封装组件中，使用特殊的元素就可以为封装组件开启一个插槽；
5. 该插槽插入什么内容取决于父组件如何使用；

插槽标签 <slot><p>我是默认内容</p></slot>
```

### 默认插槽  
```
一个不带 name 的slot，会带有隐含的名字 default；
```
### 具名插槽 - 动态插槽名   
```
具名插槽顾名思义就是给插槽起一个名字， 元素有一个特殊的 attribute：name；

v-slot:name ==> name 对应 <slot name="test"></slot> 的name值

可通过 v-slot:[dynamicSlotName]方式动态绑定一个名称（#[dynamicSlotName]）；

v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #；
eg: <template v-slot:left> 我是左边的插槽 </template> ==> <template #left> 我是左边的插槽 </template> 
```
### 作用域插槽
```
1. 默认插槽作用域传值
在父组件中通过 v-slot="slotProps"等形式接收子组件传毒过来的数据，slotProps 的名字是可以任意取的，它是一个对象，包含了所有传递过来的数据。
2. 具名插槽作用域传值
具名插槽作用域之间的传递其实默认插槽作用域传值原理是一样的。

child.vue 代码如下：
<template>
  <div class="child-box">
    <p>我是子组件</p>

    <!-- 默认插槽作用域传值 -->
    <slot text="我是子组件小猪课堂" :count="1"></slot>
    
    <!-- 具名插槽作用域传值 -->
    <slot name="header" text="我是子组件小猪课堂" :count="1"></slot>
  </div>
</template>

App.vue 组件代码：
<template>
  ...
  <!-- 默认插槽作用域传值 -->
  <child v-slot="slotProps">
    <div>{{ slotProps.text }}---{{ slotProps.count }}</div>
  </child>

  <!-- 具名插槽作用域传值 -->
  <child>
    <template #header="{ text, count }">
      <div>{{ text }}---{{ count }}</div>
    </template>
  </child>
</template>
```

### $props $attrs
```
formItem.v-bind="$props"
可以将父组件的所有props下发给它的子组件,子组件需要在其props:{} 中定义要接受的props。

v-bind="$attrs":
将调用组件时的组件标签上绑定的非props的特性(class和style除外)向下传递。
在子组件中应当添加 inheritAttrs: false(避免父作用域的不被认作props的特性绑定应用在子组件的根元素上)。
```


