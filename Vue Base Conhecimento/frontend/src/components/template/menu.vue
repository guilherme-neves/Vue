<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
   
     <!-- <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder="Digite para Filtar..." v-model="treeFilter" class="filter-field" /> -->
      <Tree :data="treeData" :options="treeOptions" ref="tree" :filter="treeFilter" />
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      treeFilter: "",
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { text: "name" },
        filter: { emptyText: "Categoria não encontrada" }
      }
    };
  },
  methods: {
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      return axios.get(url).then(res => res.data);
    },
    onNodeSelect(node) {
      this.$router.push({
        name: "artigosByCategoria",
        params: { id: node.id }
      });
    }
  },
  mounted(){
    this.$refs.tree.$on('node:selected',this.onNodeSelect)
  }
};
</script>

<style>
.menu {
  grid-area: menu;
 /*background:   #54585e;*/
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu a,
.menu a:hover {
  color: rgb(19, 18, 18);
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node:not(.tree-content) > .tree-content:hover   {
   background: rgba(27, 34, 124, 0.2);
}

/*
.menu .tree-node:not(.tree-content) > .tree-content:hover {
    background: rgba(27, 34, 124, 0.2);
}*/

/*
.menu .tree-node.selected > .tree-content ,
.menu .tree-node .tree-content:hover {
   background-color: rgba(27, 34, 124, 0.2);
}*/

.tree-arrow.has-child {
  filter: brightness(2);
}
/*
.tree-node:not(.selected) > .tree-content:hover {
    background:rgba(27, 34, 124, 0.2);
}*/	   
</style>