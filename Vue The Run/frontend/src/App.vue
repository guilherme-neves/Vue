<template>
 <div id="app">
    <router-view/>
  </div>
</template>



<script>
export default {
  
}
</script>


<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

body{
    font: 400 14px sans-serif;
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  
}


input, button, textarea{
    font: 400 18px sans-serif;
}

button{
    cursor: pointer;
}


.button{
    width: 100%;
    height: 60px;
    background: #739EF2;
    border: 8;
    border-radius: 8px;
    color: #FFF;
    font-weight: 700;
    margin-top: 16 px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    transition: filter 0.2s;

}

.button:hover{
 filter: brightness(90%);
}

.back-link{
    display: flex;
    align-items: center;
    margin-top: 40px;
    color: #41414d;
    font-size:18px;
    text-decoration: none;
    font-weight: bold;
    transition: opacity 0.2s;
}

.back-link{
    margin-right: 8px;
}

.back-link{
    opacity: 0.8;
}

</style>
