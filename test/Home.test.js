import Login from '../src/components/Login.vue'
import { shallowMount } from "@vue/test-utils";

test('text is right', () => {
  const wraper = shallowMount(Login)
  expect(wraper.text()).toBe('Hello World!')
  expect(2 + 2).toBe(4)
})
