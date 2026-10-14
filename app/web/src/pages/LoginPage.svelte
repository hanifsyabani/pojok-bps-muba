<script lang="ts">
  import { tick } from "svelte";
  import { z } from "zod";
  import { ArrowLeftIcon, CircleAlertIcon, EyeIcon, EyeOffIcon } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { NavigationProps } from "../types/components";

  let { navigate }: NavigationProps = $props();

  let email = $state("");
  let password = $state("");
  let passwordVisible = $state(false);
  let submitAttempted = $state(false);
  let submitError = $state("");

  const emailError = $derived(
    !submitAttempted ? "" : !email.trim()
      ? "Masukkan email Anda."
      : !z.email().safeParse(email.trim()).success
        ? "Masukkan alamat email yang valid."
        : "",
  );
  const passwordError = $derived(
    submitAttempted && !password ? "Masukkan password Anda." : "",
  );

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitAttempted = true;
    submitError = "";
    await tick();

    if (emailError || passwordError) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    submitError = "Login admin belum tersedia. Autentikasi akun admin belum terhubung.";
  }
</script>

<section class="flex min-h-svh flex-col bg-base">
  <div class="page-container pt-5 sm:pt-8">
    <a
      href="/"
      class="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-ink"
      onclick={(event) => {
        event.preventDefault();
        navigate("/");
      }}
    >
      <ArrowLeftIcon class="size-4" aria-hidden="true" />
      Kembali ke beranda
    </a>
  </div>

  <div class="page-container flex flex-1 items-center justify-center py-12 sm:py-16">
    <div class="w-full max-w-sm">
      <div class="mb-10 flex items-center gap-3">
        <img src="/logo.png" alt="Logo BPS" class="h-12 w-16 shrink-0 object-contain" width="661" height="512" />
        <div>
          <p class="text-lg font-semibold text-ink">Pojok BPS Muba</p>
          <p class="mt-1 text-xs text-muted">BPS Kabupaten Musi Banyuasin</p>
        </div>
      </div>

      <h1 class="mb-7 text-2xl font-semibold text-ink">Masuk admin</h1>

      <form class="space-y-5" novalidate onsubmit={handleSubmit} oninput={() => (submitError = "")}>
        <div class="space-y-2">
          <Label for="login-email" class="text-sm font-medium text-ink">Email <span class="text-danger-text" aria-hidden="true">*</span></Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autocomplete="username"
            autocapitalize="none"
            spellcheck={false}
            required
            bind:value={email}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "login-email-error" : undefined}
            class="h-12 bg-surface"
          />
          {#if emailError}
            <p id="login-email-error" class="text-sm text-danger-text">{emailError}</p>
          {/if}
        </div>

        <div class="space-y-2">
          <Label for="login-password" class="text-sm font-medium text-ink">Password <span class="text-danger-text" aria-hidden="true">*</span></Label>
          <div class="relative">
            <Input
              id="login-password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autocomplete="current-password"
              required
              bind:value={password}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "login-password-error" : undefined}
              class="h-12 bg-surface pr-13"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute top-0.5 right-0.5 text-muted hover:text-ink"
              aria-label={passwordVisible ? "Sembunyikan password" : "Tampilkan password"}
              title={passwordVisible ? "Sembunyikan password" : "Tampilkan password"}
              aria-pressed={passwordVisible}
              onclick={() => (passwordVisible = !passwordVisible)}
            >
              {#if passwordVisible}
                <EyeOffIcon class="size-5" aria-hidden="true" />
              {:else}
                <EyeIcon class="size-5" aria-hidden="true" />
              {/if}
            </Button>
          </div>
          {#if passwordError}
            <p id="login-password-error" class="text-sm text-danger-text">{passwordError}</p>
          {/if}
        </div>

        {#if submitError}
          <div role="alert" class="flex items-start gap-2.5 rounded-md border border-bps-orange-border bg-bps-orange-light p-3 text-sm text-bps-orange-text">
            <CircleAlertIcon class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{submitError}</p>
          </div>
        {/if}

        <Button type="submit" class="h-12 w-full font-semibold">Masuk</Button>
      </form>
    </div>
  </div>

  <p class="px-4 pb-6 text-center text-xs text-muted">&copy; {new Date().getFullYear()} Pojok BPS Muba</p>
</section>
