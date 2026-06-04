import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import type { Speaker, Partner, Exhibitor, Testimonial, BlogPost, AgendaItem, User, IndustrySector } from "@/types";

const DATA_DIR = join(process.cwd(), "data");

function read<T>(file: string): T[] {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, file), "utf-8")) as T[];
  } catch {
    return [];
  }
}

function write<T>(file: string, data: T[]): void {
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ── Users ─────────────────────────────────────────────────────────────────────
export function getUsers(): User[] {
  return read<User>("users.json");
}
export function addUser(data: Omit<User, "id">): User {
  const all = getUsers();
  const user: User = { ...data, id: crypto.randomUUID() };
  write("users.json", [...all, user]);
  return user;
}
export function updateUser(id: string, data: Partial<User>): User | null {
  const all = getUsers();
  const idx = all.findIndex(u => u.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("users.json", all);
  return all[idx];
}
export function deleteUser(id: string): boolean {
  const all = getUsers();
  const filtered = all.filter(u => u.id !== id);
  if (filtered.length === all.length) return false;
  write("users.json", filtered);
  return true;
}

// ── Speakers ─────────────────────────────────────────────────────────────────
export function getSpeakers(): Speaker[] {
  return read<Speaker>("speakers.json").sort((a, b) => a.order - b.order);
}
export function getActiveSpeakers(): Speaker[] {
  return getSpeakers().filter((s) => s.active && s.status === "approved");
}
export function addSpeaker(data: Omit<Speaker, "id" | "order">): Speaker {
  const all = getSpeakers();
  const speaker: Speaker = { ...data, id: crypto.randomUUID(), order: all.length + 1 };
  write("speakers.json", [...all, speaker]);
  return speaker;
}
export function updateSpeaker(id: string, data: Partial<Speaker>): Speaker | null {
  const all = getSpeakers();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("speakers.json", all);
  return all[idx];
}
export function deleteSpeaker(id: string): boolean {
  const all = getSpeakers();
  const filtered = all.filter((s) => s.id !== id);
  if (filtered.length === all.length) return false;
  write("speakers.json", filtered);
  return true;
}

// ── Partners ─────────────────────────────────────────────────────────────────
export function getPartners(): Partner[] {
  return read<Partner>("partners.json").sort((a, b) => a.order - b.order);
}
export function getActivePartners(): Partner[] {
  return getPartners().filter((p) => p.active && p.status === "approved");
}
export function addPartner(data: Omit<Partner, "id" | "order">): Partner {
  const all = getPartners();
  const partner: Partner = { ...data, id: crypto.randomUUID(), order: all.length + 1, status: data.status ?? "approved", rejectionNote: data.rejectionNote ?? "" };
  write("partners.json", [...all, partner]);
  return partner;
}
export function updatePartner(id: string, data: Partial<Partner>): Partner | null {
  const all = getPartners();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("partners.json", all);
  return all[idx];
}
export function deletePartner(id: string): boolean {
  const all = getPartners();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  write("partners.json", filtered);
  return true;
}

// ── Exhibitors ────────────────────────────────────────────────────────────────
export function getExhibitors(): Exhibitor[] {
  return read<Exhibitor>("exhibitors.json").sort((a, b) => a.order - b.order);
}
export function getActiveExhibitors(): Exhibitor[] {
  return getExhibitors().filter((e) => e.active && e.status === "approved");
}
export function addExhibitor(data: Omit<Exhibitor, "id" | "order">): Exhibitor {
  const all = getExhibitors();
  const exhibitor: Exhibitor = { ...data, id: crypto.randomUUID(), order: all.length + 1, status: data.status ?? "approved", rejectionNote: data.rejectionNote ?? "" };
  write("exhibitors.json", [...all, exhibitor]);
  return exhibitor;
}
export function updateExhibitor(id: string, data: Partial<Exhibitor>): Exhibitor | null {
  const all = getExhibitors();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("exhibitors.json", all);
  return all[idx];
}
export function deleteExhibitor(id: string): boolean {
  const all = getExhibitors();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;
  write("exhibitors.json", filtered);
  return true;
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function getTestimonials(): Testimonial[] {
  return read<Testimonial>("testimonials.json").sort((a, b) => a.order - b.order);
}
export function getActiveTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => t.active && t.status === "approved");
}
export function addTestimonial(data: Omit<Testimonial, "id" | "order">): Testimonial {
  const all = getTestimonials();
  const t: Testimonial = { ...data, id: crypto.randomUUID(), order: all.length + 1, status: data.status ?? "approved", rejectionNote: data.rejectionNote ?? "" };
  write("testimonials.json", [...all, t]);
  return t;
}
export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const all = getTestimonials();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("testimonials.json", all);
  return all[idx];
}
export function deleteTestimonial(id: string): boolean {
  const all = getTestimonials();
  const filtered = all.filter((t) => t.id !== id);
  if (filtered.length === all.length) return false;
  write("testimonials.json", filtered);
  return true;
}

// ── Agenda ────────────────────────────────────────────────────────────────────
export function getAgenda(): AgendaItem[] {
  return read<AgendaItem>("agenda.json").sort((a, b) => a.order - b.order);
}
export function getActiveAgenda(): AgendaItem[] {
  return getAgenda().filter((a) => a.active && a.status === "approved");
}
export function addAgendaItem(data: Omit<AgendaItem, "id" | "order">): AgendaItem {
  const all = getAgenda();
  const item: AgendaItem = { ...data, id: crypto.randomUUID(), order: all.length + 1, status: data.status ?? "approved", rejectionNote: data.rejectionNote ?? "" };
  write("agenda.json", [...all, item]);
  return item;
}
export function updateAgendaItem(id: string, data: Partial<AgendaItem>): AgendaItem | null {
  const all = getAgenda();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("agenda.json", all);
  return all[idx];
}
export function deleteAgendaItem(id: string): boolean {
  const all = getAgenda();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;
  write("agenda.json", filtered);
  return true;
}

// ── Blogs ─────────────────────────────────────────────────────────────────────
export function getBlogs(): BlogPost[] {
  return read<BlogPost>("blogs.json").sort((a, b) => a.order - b.order);
}
export function getActiveBlogs(): BlogPost[] {
  return getBlogs().filter((b) => b.active && b.status === "approved");
}
export function addBlog(data: Omit<BlogPost, "id" | "order">): BlogPost {
  const all = getBlogs();
  const blog: BlogPost = { ...data, id: crypto.randomUUID(), order: all.length + 1, status: data.status ?? "approved", rejectionNote: data.rejectionNote ?? "" };
  write("blogs.json", [...all, blog]);
  return blog;
}
export function updateBlog(id: string, data: Partial<BlogPost>): BlogPost | null {
  const all = getBlogs();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("blogs.json", all);
  return all[idx];
}
export function deleteBlog(id: string): boolean {
  const all = getBlogs();
  const filtered = all.filter((b) => b.id !== id);
  if (filtered.length === all.length) return false;
  write("blogs.json", filtered);
  return true;
}

// ── Industry Sectors ──────────────────────────────────────────────────────────
export function getIndustrySectors(): IndustrySector[] {
  return read<IndustrySector>("industries.json").sort((a, b) => a.order - b.order);
}
export function addIndustrySector(data: Omit<IndustrySector, "id" | "order">): IndustrySector {
  const all = getIndustrySectors();
  const sector: IndustrySector = { ...data, id: crypto.randomUUID(), order: all.length + 1 };
  write("industries.json", [...all, sector]);
  return sector;
}
export function updateIndustrySector(id: string, data: Partial<IndustrySector>): IndustrySector | null {
  const all = getIndustrySectors();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write("industries.json", all);
  return all[idx];
}
export function deleteIndustrySector(id: string): boolean {
  const all = getIndustrySectors();
  const filtered = all.filter((s) => s.id !== id);
  if (filtered.length === all.length) return false;
  write("industries.json", filtered);
  return true;
}
export function reorderIndustrySectors(ids: string[]): IndustrySector[] {
  const all = getIndustrySectors();
  const reordered = ids
    .map((id, index) => {
      const sector = all.find((s) => s.id === id);
      if (!sector) return null;
      return { ...sector, order: index + 1 };
    })
    .filter((s): s is IndustrySector => s !== null);
  // Append any sectors not in the ids list (preserving them at the end)
  const idsSet = new Set(ids);
  const remaining = all.filter((s) => !idsSet.has(s.id)).map((s, i) => ({ ...s, order: reordered.length + i + 1 }));
  const final = [...reordered, ...remaining];
  write("industries.json", final);
  return final.sort((a, b) => a.order - b.order);
}
