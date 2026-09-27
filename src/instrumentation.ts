// Runs once when the server starts, before it handles requests. Payload's onInit is not enough:
// after a failed first initialization, Payload initializes again without it.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { assertRuntimeConfig } = await import('@/payload/utilities/assert-runtime-config')
    assertRuntimeConfig()
  }
}
