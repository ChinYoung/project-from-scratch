import Home from '../src/components/Home.vue'
import { mount } from '@vue/test-utils'

test('should fetch users', () => {
  const wrapper = mount(Home)
  console.log(wrapper)
  expect(2 + 2).toBe(4)
})
