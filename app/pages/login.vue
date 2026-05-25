<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { authClient } from '~/utils/auth-client'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue.',
})

const route = useRoute()
const toast = useToast()
const loading = ref(false)

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
  required: true,
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const,
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters'),
  remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true

  try {
    const { error } = await authClient.signIn.email({
      email: payload.data.email,
      password: payload.data.password,
      rememberMe: payload.data.remember ?? true,
    })

    if (error) {
      toast.add({
        title: 'Sign in failed',
        description: error.message ?? 'Check your email and password.',
        color: 'error',
      })
      return
    }

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    await navigateTo(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :loading="loading"
    title="Welcome back"
    icon="i-lucide-lock"
    @submit="onSubmit"
  >
    <template #description>
      Don't have an account?
      <ULink to="/signup" class="text-primary font-medium">Sign up</ULink>.
    </template>
  </UAuthForm>
</template>
