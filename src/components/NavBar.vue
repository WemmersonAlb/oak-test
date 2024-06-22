<script>
export default {
    name: 'NavBar'
}
</script>

<template>
    <div class="navbar">
        <div class="linha1">
            <img src="../assets/imgs/oak__1_-removebg-preview.png" alt="Logo OAK">
            <h1><span class="white">Oak</span> Tecnologia</h1>            
        </div>
        <div class="linha2">
            <h2>Teste Técnico</h2>
        </div>
    </div>
</template>
<style scoped>
    .navbar{
        width: 100%;
        padding: 10px 0 10px 30px;
        background-color: #1C8894;
        box-shadow: 2px 2px 5px #222;
    }
    .linha1{
        display: flex;
    }
    .linha2{
        padding-left: 60px;
        margin-top: -5px;
    }
    h2{
        font-size: 18px;
        color: #333;
    }
    img{
        width: 50px;
        margin-right: 10px;
    }
</style>