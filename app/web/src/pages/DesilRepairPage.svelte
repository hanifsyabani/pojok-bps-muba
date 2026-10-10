<script lang="ts">
  import {
    allowedUploadTypes as allowedTypes,
    desilProcessSteps,
    desilReferenceNumber as referenceNumber,
    desilRequirements,
    emptyDesilForm,
    emptyUploadState,
    kecamatanOptions,
    uploadDocuments
  } from "../constants/desil";
  import type { ToastProps } from "../types/components";
  import type { DesilForm, UploadId, UploadItem } from "../types/desil";

  let { showToast }: ToastProps = $props();

  let desilForm = $state<DesilForm>({ ...emptyDesilForm });
  let uploads = $state<UploadItem[]>(uploadDocuments.map((document) => ({ ...document, ...emptyUploadState })));

  let submitAttempted = $state(false);
  let reviewMode = $state(false);
  let formSubmitting = $state(false);
  let successOpen = $state(false);

  const formValid = $derived(
    desilForm.nama.trim().length > 0 &&
      desilForm.nik.trim().length === 16 &&
      desilForm.kk.trim().length === 16 &&
      desilForm.telepon.trim().length > 0 &&
      desilForm.desa.trim().length > 0 &&
      desilForm.kecamatan.trim().length > 0 &&
      desilForm.alamat.trim().length > 0 &&
      desilForm.alasan.trim().length > 0
  );

  const filesReady = $derived(uploads.every((item) => item.status === "done"));
  const canReview = $derived(formValid && filesReady);

  const errors = $derived({
    nama: submitAttempted && desilForm.nama.trim().length === 0 ? "Nama wajib diisi." : "",
    nik: submitAttempted && desilForm.nik.trim().length !== 16 ? "NIK harus 16 digit." : "",
    kk: submitAttempted && desilForm.kk.trim().length !== 16 ? "Nomor KK harus 16 digit." : "",
    telepon: submitAttempted && desilForm.telepon.trim().length === 0 ? "Nomor telepon wajib diisi." : "",
    desa: submitAttempted && desilForm.desa.trim().length === 0 ? "Desa/kelurahan wajib diisi." : "",
    kecamatan: submitAttempted && desilForm.kecamatan.trim().length === 0 ? "Pilih kecamatan." : "",
    alamat: submitAttempted && desilForm.alamat.trim().length === 0 ? "Alamat wajib diisi." : "",
    alasan: submitAttempted && desilForm.alasan.trim().length === 0 ? "Uraikan alasan perbaikan." : "",
    file: submitAttempted && !filesReady ? "Semua dokumen pendukung wajib siap ditinjau." : ""
  });

  function onlyDigits(value: string) {
    return value.replace(/\D/g, "").slice(0, 16);
  }

  function updateNik(value: string) {
    desilForm.nik = onlyDigits(value);
    reviewMode = false;
  }

  function updateKk(value: string) {
    desilForm.kk = onlyDigits(value);
    reviewMode = false;
  }

  function setReviewDirty() {
    reviewMode = false;
  }

  function handleFileSelected(id: UploadId, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const target = uploads.find((item) => item.id === id);

    if (!file || !target) return;

    const isAllowed = allowedTypes.includes(file.type) || /\.(pdf|jpe?g|png)$/i.test(file.name);
    const isTooLarge = file.size > 5 * 1024 * 1024;

    if (!isAllowed || isTooLarge) {
      target.file = null;
      target.status = "invalid";
      target.progress = 0;
      target.message = isTooLarge
        ? "Ukuran file melebihi 5 MB"
        : "Format file harus PDF, JPG, JPEG, atau PNG";
      input.value = "";
      reviewMode = false;
      return;
    }

    target.file = file;
    target.status = "uploading";
    target.progress = 45;
    target.message = "Simulasi unggah berjalan";
    input.value = "";
    reviewMode = false;

    setTimeout(() => {
      target.status = "done";
      target.progress = 100;
      target.message = "File siap ditinjau";
    }, 650);
  }

  function removeFile(id: UploadId) {
    const target = uploads.find((item) => item.id === id);
    if (!target) return;
    target.file = null;
    target.status = "empty";
    target.progress = 0;
    target.message = "Belum ada file";
    reviewMode = false;
  }

  async function handleDesilSubmit(event: Event) {
    event.preventDefault();
    submitAttempted = true;

    if (!canReview) {
      showToast("Lengkapi data wajib dan dokumen pendukung terlebih dahulu.");
      return;
    }

    if (!reviewMode) {
      reviewMode = true;
      showToast("Mode tinjau aktif. Periksa ringkasan sebelum mengirim.");
      return;
    }

    formSubmitting = true;
    await new Promise((resolve) => setTimeout(resolve, 900));
    formSubmitting = false;
    successOpen = true;
    reviewMode = false;
  }

  function resetDesilForm() {
    desilForm = { ...emptyDesilForm };
    uploads = uploadDocuments.map((document) => ({ ...document, ...emptyUploadState }));
    submitAttempted = false;
    reviewMode = false;
    successOpen = false;
  }
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Perbaikan Data Desil DTSEN</div>
      <h1 class="page-heading">Form perbaikan data desil</h1>
      <p class="mt-4 max-w-[70ch]">
        Form prototype untuk mensimulasikan pengajuan koreksi data desil DTSEN,
        validasi identitas, unggah dokumen, dan ringkasan sebelum kirim.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Data tidak dikirim</strong>
      <span class="text-sm">File hanya dibaca oleh browser selama halaman terbuka dan tidak disimpan.</span>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid items-start gap-5 xl:grid-cols-[330px_minmax(0,1fr)]">
    <aside class="rounded-lg border border-border-default bg-surface p-5 shadow-sm xl:sticky xl:top-32">
      <h2 class="mb-2 text-base font-bold text-ink">Alur pengajuan</h2>
      <ol class="my-4 list-decimal space-y-2 pl-5">
        {#each desilProcessSteps as step}
          <li>{step}</li>
        {/each}
      </ol>
      <div class="rounded-lg border border-bps-orange-border bg-bps-orange-light p-4 text-sm text-bps-orange-text">
        <strong class="font-bold">Persyaratan contoh</strong>
        <ul class="mt-2 list-disc pl-4 text-body">
          {#each desilRequirements as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </aside>

    <form class="grid min-w-0 gap-4 rounded-lg border border-border-default bg-surface p-5 shadow-sm" onsubmit={handleDesilSubmit}>
      <div class="flex flex-col gap-4 border-b border-border-subtle pb-3 md:flex-row md:items-center md:justify-between">
        <strong class="font-bold text-ink">Informasi pemohon</strong>
        <span class="text-sm text-muted">Kolom bertanda * wajib diisi.</span>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="field-label">
          Nama Lengkap *
          <input
            class="field-input"
            bind:value={desilForm.nama}
            oninput={setReviewDirty}
            required
            aria-invalid={errors.nama ? "true" : "false"}
            placeholder="Nama sesuai dokumen"
          />
          {#if errors.nama}<small class="text-xs font-bold text-bps-orange-text">{errors.nama}</small>{/if}
        </label>

        <label class="field-label">
          NIK *
          <input
            class="field-input"
            value={desilForm.nik}
            oninput={(event) => updateNik(event.currentTarget.value)}
            required
            maxlength="16"
            inputmode="numeric"
            aria-invalid={errors.nik ? "true" : "false"}
            placeholder="16 digit NIK"
          />
          {#if errors.nik}<small class="text-xs font-bold text-bps-orange-text">{errors.nik}</small>{/if}
        </label>

        <label class="field-label">
          Nomor KK *
          <input
            class="field-input"
            value={desilForm.kk}
            oninput={(event) => updateKk(event.currentTarget.value)}
            required
            maxlength="16"
            inputmode="numeric"
            aria-invalid={errors.kk ? "true" : "false"}
            placeholder="16 digit nomor KK"
          />
          {#if errors.kk}<small class="text-xs font-bold text-bps-orange-text">{errors.kk}</small>{/if}
        </label>

        <label class="field-label">
          Nomor Telepon *
          <input
            class="field-input"
            bind:value={desilForm.telepon}
            oninput={setReviewDirty}
            required
            inputmode="tel"
            aria-invalid={errors.telepon ? "true" : "false"}
            placeholder="08xxxxxxxxxx"
          />
          {#if errors.telepon}<small class="text-xs font-bold text-bps-orange-text">{errors.telepon}</small>{/if}
        </label>

        <label class="field-label">
          Desa/Kelurahan *
          <input
            class="field-input"
            bind:value={desilForm.desa}
            oninput={setReviewDirty}
            required
            aria-invalid={errors.desa ? "true" : "false"}
            placeholder="Contoh: Balai Agung"
          />
          {#if errors.desa}<small class="text-xs font-bold text-bps-orange-text">{errors.desa}</small>{/if}
        </label>

        <label class="field-label">
          Kecamatan *
          <select
            class="field-input"
            bind:value={desilForm.kecamatan}
            onchange={setReviewDirty}
            required
            aria-invalid={errors.kecamatan ? "true" : "false"}
          >
            <option value="">Pilih kecamatan</option>
            {#each kecamatanOptions as kecamatan}
              <option value={kecamatan}>{kecamatan}</option>
            {/each}
          </select>
          {#if errors.kecamatan}<small class="text-xs font-bold text-bps-orange-text">{errors.kecamatan}</small>{/if}
        </label>
      </div>

      <label class="field-label">
        Alamat *
        <textarea
          class="field-input resize-y"
          bind:value={desilForm.alamat}
          oninput={setReviewDirty}
          required
          rows="3"
          aria-invalid={errors.alamat ? "true" : "false"}
          placeholder="Alamat lengkap pemohon"
        ></textarea>
        {#if errors.alamat}<small class="text-xs font-bold text-bps-orange-text">{errors.alamat}</small>{/if}
      </label>

      <label class="field-label">
        Alasan perbaikan *
        <textarea
          class="field-input resize-y"
          bind:value={desilForm.alasan}
          oninput={setReviewDirty}
          required
          rows="3"
          aria-invalid={errors.alasan ? "true" : "false"}
          placeholder="Jelaskan data yang perlu diperbaiki"
        ></textarea>
        {#if errors.alasan}<small class="text-xs font-bold text-bps-orange-text">{errors.alasan}</small>{/if}
      </label>

      <div class="flex flex-col gap-4 border-b border-border-subtle pb-3 md:flex-row md:items-center md:justify-between">
        <strong class="font-bold text-ink">Dokumen pendukung</strong>
        <span class="text-sm text-muted">Simulasi unggah file lokal.</span>
      </div>

      <div class="grid gap-3" aria-live="polite">
        {#each uploads as item}
          <div class="grid min-w-0 gap-3 rounded-lg border border-dashed border-border-strong bg-surface-strong p-4 data-[status=done]:border-bps-green data-[status=done]:bg-bps-green-light data-[status=invalid]:border-bps-orange data-[status=invalid]:bg-bps-orange-light md:grid-cols-[minmax(0,1fr)_auto]" data-status={item.status}>
            <div class="min-w-0">
              <strong class="font-bold text-ink">{item.label}</strong>
              <p class="mt-1 text-sm text-muted">{item.hint}</p>
              {#if item.file}
                <small class="mt-1 block text-sm wrap-anywhere text-muted">{item.file.name} - {(item.file.size / 1024).toFixed(1)} KB</small>
              {:else}
                <small class="mt-1 block text-sm text-muted">{item.message}</small>
              {/if}
            </div>
            <div class="flex flex-wrap items-start gap-2">
              <label class="relative inline-flex min-h-[38px] cursor-pointer items-center rounded-lg border border-bps-sky-border bg-bps-sky-light px-3 text-sm font-extrabold text-bps-sky-text focus-within:ring-3 focus-within:ring-bps-sky/45">
                Pilih file
                <input
                  class="sr-only"
                  type="file"
                  aria-label={`Pilih file ${item.label}`}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onchange={(event) => handleFileSelected(item.id, event)}
                />
              </label>
              {#if item.file}
                <button type="button" class="inline-flex min-h-[38px] items-center rounded-lg border border-bps-orange-border bg-bps-orange-light px-3 text-sm font-extrabold text-bps-orange-text" onclick={() => removeFile(item.id)}>Hapus</button>
              {/if}
            </div>
            <div class="col-span-full h-1.5 overflow-hidden rounded-full bg-border-subtle" aria-hidden="true">
              <span class="block h-full w-(--upload-progress) rounded-full bg-bps-green transition-[width] duration-200 motion-reduce:transition-none" style={`--upload-progress: ${item.progress}%`}></span>
            </div>
            <em class="text-sm text-muted not-italic">{item.message}</em>
          </div>
        {/each}
        {#if errors.file}<small class="text-xs font-bold text-bps-orange-text">{errors.file}</small>{/if}
      </div>

      {#if reviewMode}
        <div class="rounded-lg border border-bps-green-border bg-bps-green-light p-4 text-sm text-bps-green-text" aria-live="polite">
          <strong class="font-bold">Ringkasan pengajuan</strong>
          <p class="mt-1.5">{desilForm.nama} - {desilForm.desa}, {desilForm.kecamatan}</p>
          <p class="mt-1.5">{uploads.length} dokumen pendukung siap dikirim sebagai simulasi.</p>
        </div>
      {/if}

      <button type="submit" class="btn-primary" disabled={formSubmitting}>
        {#if formSubmitting}
          Mengirim prototype...
        {:else if reviewMode}
          Kirim Pengajuan DTSEN
        {:else}
          Tinjau Pengajuan
        {/if}
      </button>
    </form>
  </div>
</section>

{#if successOpen}
  <div class="fixed inset-0 z-[100] grid place-items-start justify-items-center overflow-auto bg-ink/65 px-4 pt-20 pb-8" role="presentation">
    <button
      type="button"
      class="fixed inset-0 cursor-default bg-transparent"
      aria-label="Tutup pesan berhasil"
      onclick={() => (successOpen = false)}
    ></button>
    <div
      class="relative z-10 grid w-full max-w-[640px] justify-items-center gap-3 overflow-hidden rounded-lg border border-border-default bg-surface p-8 text-center shadow-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Pengajuan berhasil"
      tabindex="-1"
      onkeydown={(event) => {
        if (event.key === "Escape") successOpen = false;
      }}
    >
      <div class="grid size-16 place-items-center rounded-full bg-bps-green-light font-extrabold text-bps-green-text" aria-hidden="true">OK</div>
      <h2 class="text-2xl leading-tight font-bold text-ink">Pengajuan berhasil dikirim</h2>
      <p>Nomor Pengajuan: <strong class="font-bold">{referenceNumber}</strong></p>
      <p>Status: <strong class="font-bold">Menunggu Verifikasi</strong></p>
      <button type="button" class="btn-primary" onclick={resetDesilForm}>Buat Pengajuan Baru</button>
    </div>
  </div>
{/if}
