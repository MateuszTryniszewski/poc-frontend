export interface FormKitVuePlugin {
  clearErrors: (formId: string) => void
  get: (id: string) => FormKitNode | undefined
  reset: (formId: string, resetTo?: unknown) => void
  setErrors: (
    formId: string,
    errors: string[] | Record<string, string | string[]>,
    inputErrors?: string[] | Record<string, string | string[]>
  ) => void
  setLocale: (locale: string) => void
  submit: (formId: string) => void
}
