<template>
  <div class="artigo-item">
    <router-link :to="{name:'artigoById', params:{id:artigo.id} }">
      <div class="artigo-item-image d-none d-sm-block">
        <img v-if="artigo.imageUrl" :src="artigo.imageUrl" height="50" width="50" alt="Artigo" />
        <img v-else src="@/assets/artigo.png" height="50" width="50" alt="Artigo" />
      </div>
      <div class="artigo-item-info">
        <h4>{{artigo.name}}</h4>
        <p>{{artigo.description}}</p>
        <span class="artigo-item-autor">
          <strong>Autor:</strong>
          {{artigo.author}}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArtigoItem",
  props: ["artigo"]
};
</script>

<style>
.artigo-item {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.artigo-item a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.artigo-item-info h3 {
  font-size: 1.7rem;
}

.artigo-item-image {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.artigo-item-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.artigo-item-info p {
  flex: 1;
  color: #555;
}

.artigo-item-image img {
  border-radius: 5px;
}
</style>