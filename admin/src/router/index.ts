import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CoursesList from '../views/courses/CoursesList.vue'
import CoursesEdit from '../views/courses/CoursesEdit.vue'
import EpisodesList from '../views/episodes/EpisodesList.vue'
import EpisodesEdit from '../views/episodes/EpisodesEdit.vue'
import UsersList from '../views/users/UsersList.vue'
import UsersEdit from '../views/users/UsersEdit.vue'
import DocsList from '../views/docs/DocsList.vue'
import DocsEdit from '../views/docs/DocsEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'courses-list', path: '/courses/list', component: CoursesList },
      { name: 'courses-edit', path: '/courses/edit/:id', component: CoursesEdit, props: true },
      { name: 'courses-create', path: '/courses/create', component: CoursesEdit },

      { name: 'episodes-list', path: '/episodes/list', component: EpisodesList },
      { name: 'episodes-edit', path: '/episodes/edit/:id', component: EpisodesEdit, props: true },
      { name: 'episodes-create', path: '/episodes/create', component: EpisodesEdit },

      { name: 'users-list', path: '/users/list', component: UsersList },
      { name: 'users-edit', path: '/users/edit/:id', component: UsersEdit, props: true },
      { name: 'users-create', path: '/users/create', component: UsersEdit },

      { name: 'docs-list', path: '/docs/list', component: DocsList },
      { name: 'docs-edit', path: '/docs/edit/:id', component: DocsEdit, props: true },
      { name: 'docs-create', path: '/docs/create', component: DocsEdit },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
