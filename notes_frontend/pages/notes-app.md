---
# Notes App
layout: center
class: text-left
---

<div id="notes-app-root"></div>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

/**
 * PUBLIC_INTERFACE
 * getFeatureFlags reads optional flags from VITE_FEATURE_FLAGS for conditional UI tweaks.
 */
function getFeatureFlags(): Record<string, any> {
  try {
    // @ts-ignore - import.meta.env provided by Vite
    const raw = import.meta?.env?.VITE_FEATURE_FLAGS
    if (!raw) return {}
    if (typeof raw === 'string') {
      try { return JSON.parse(raw) } catch { return {} }
    }
    return raw || {}
  } catch {
    return {}
  }
}

/**
 * PUBLIC_INTERFACE
 * Notes App manages notes state and localStorage.
 */
function useNotesStorage() {
  const STORAGE_KEY = 'notes_app_items'
  const notes = ref<{ id: string; title: string; content: string; createdAt: number }[]>([])

  // Load notes from localStorage
  onMounted(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          notes.value = parsed
        }
      }
    } catch (e) {
      console.error('Failed to load notes from localStorage', e)
    }
  })

  // Persist on change
  watch(
    notes,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch (e) {
        console.error('Failed to save notes to localStorage', e)
      }
    },
    { deep: true }
  )

  // PUBLIC_INTERFACE
  function addNote(title: string, content: string) {
    if (!title.trim() || !content.trim()) return
    const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`
    notes.value.unshift({
      id,
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    })
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id)
  }

  return { notes, addNote, deleteNote }
}

const { notes, addNote, deleteNote } = useNotesStorage()
const title = ref('')
const content = ref('')
const flags = ref(getFeatureFlags())

function handleAdd() {
  if (!title.value.trim() || !content.value.trim()) {
    // simple inline validation glow
    const t = document.querySelector<HTMLInputElement>('#note-title')
    const c = document.querySelector<HTMLTextAreaElement>('#note-content')
    t?.classList.add('input-error')
    c?.classList.add('input-error')
    setTimeout(() => {
      t?.classList.remove('input-error')
      c?.classList.remove('input-error')
    }, 800)
    return
  }
  addNote(title.value, content.value)
  title.value = ''
  content.value = ''
}
</script>

<style>
/* Ocean Professional (light) colors mapped to this slide section */
:root {
  --ocean-primary: #2563EB;
  --ocean-secondary: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-bg: #f9fafb;
  --ocean-surface: #ffffff;
  --ocean-text: #111827;
  --ocean-muted: #6b7280;
  --ocean-border: #e5e7eb;
}

/* Container styles */
#notes-app-root {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 16px;
}

/* Header */
.notes-header {
  background: linear-gradient(135deg, rgba(59,130,246,0.10), rgba(249,250,251,1));
  border: 1px solid var(--ocean-border);
  background-color: var(--ocean-bg);
  border-radius: 16px;
  padding: 18px 20px;
  color: var(--ocean-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
}

.notes-header .title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: clamp(20px, 2.2vw, 28px);
}

.badge-flag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.22);
  color: var(--ocean-text);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Card container */
.card-surface {
  background: var(--ocean-surface);
  border: 1px solid var(--ocean-border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

/* Form styles */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 14px;
}

.input,
.textarea {
  width: 100%;
  border: 1px solid var(--ocean-border);
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--ocean-surface);
  color: var(--ocean-text);
  outline: none;
  transition: box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02) inset;
}

.input:focus,
.textarea:focus {
  border-color: rgba(37,99,235,0.45);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.input-error,
.textarea.input-error {
  border-color: var(--ocean-error) !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12) !important;
}

.textarea {
  min-height: 120px;
  resize: vertical;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  border: 0;
  transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}

.btn-primary {
  background: var(--ocean-primary);
  color: #fff;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.30);
}

.btn-secondary {
  background: #fff;
  color: var(--ocean-text);
  border: 1px solid var(--ocean-border);
}

.btn-secondary:hover {
  background: #f3f4f6;
}

/* Notes list */
.notes-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;
}

.note-item {
  background: var(--ocean-surface);
  border: 1px solid var(--ocean-border);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.note-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.08);
  border-color: rgba(37,99,235,0.25);
}

.note-title {
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ocean-text);
  margin: 0 0 6px 0;
  font-size: 16px;
}

.note-content {
  color: var(--ocean-muted);
  margin: 0 0 8px 0;
  white-space: pre-wrap;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ocean-muted);
  font-size: 12px;
}

.note-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-delete {
  background: #fff;
  color: var(--ocean-error);
  border: 1px solid rgba(239, 68, 68, 0.45);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.06);
}

.helper {
  color: var(--ocean-muted);
  font-size: 12px;
  margin-top: 6px;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .notes-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>

<div class="notes-header">
  <div class="title">
    <span style="display:inline-flex;width:12px;height:12px;border-radius:9999px;background:linear-gradient(135deg, rgba(37,99,235,1), rgba(59,130,246,0.6)); box-shadow:0 0 0 4px rgba(37,99,235,0.15)"></span>
    Ocean Notes
  </div>
  <div v-if="Object.keys(flags).length" class="badge-flag" title="Feature flags detected from VITE_FEATURE_FLAGS">
    Flags On
  </div>
</div>

<div class="card-surface mt-1">
  <div class="overline">Create a Note</div>
  <div class="form-grid">
    <input
      id="note-title"
      class="input"
      type="text"
      placeholder="Note title"
      v-model="title"
      aria-label="Note title"
      required
    />
    <textarea
      id="note-content"
      class="textarea"
      placeholder="Write your note..."
      v-model="content"
      aria-label="Note content"
      required
    ></textarea>
    <div style="display:flex; align-items:center; gap:8px;">
      <button class="btn btn-primary" @click="handleAdd">Add Note</button>
      <button class="btn btn-secondary" @click="title=''; content=''">Clear</button>
      <span class="helper">Title and content are required</span>
    </div>
  </div>
</div>

<div class="mt-1">
  <div class="overline">Your Notes</div>
  <div class="notes-list" v-if="notes.length">
    <div class="note-item" v-for="n in notes" :key="n.id">
      <h4 class="note-title">{{ n.title }}</h4>
      <p class="note-content">{{ n.content }}</p>
      <div style="display:flex; align-items:center;">
        <div class="note-meta">
          <span>Saved</span>
          <span>•</span>
          <span>{{ new Date(n.createdAt).toLocaleString() }}</span>
        </div>
        <div class="note-actions">
          <button class="btn btn-delete" @click="deleteNote(n.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card-surface" style="text-align:center;">
    <div class="muted">No notes yet. Start by creating your first note above.</div>
  </div>
</div>
