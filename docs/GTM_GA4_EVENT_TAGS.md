# GTM: GA4 Event tags — investors & main app

Step-by-step instructions to send your app’s custom `dataLayer` events to GA4. Use the **same GTM container** for both **investors.getrandomtrip.com** (investor-room) and **getrandomtrip.com** (main app); filter by **Page Hostname** when you want a tag to fire only on one site.

---

## Prerequisites

- GTM container installed on both sites (same `NEXT_PUBLIC_GTM_ID`).
- **GA4 Configuration tag** already set up (sends page_view, loads gtag). You need its **Measurement ID** (e.g. `G-XXXXXXXXXX`).
- In GTM: **Variables** → **Configure** → enable **Page Hostname** and **Event** (built-in). **Event** = the Custom Event name that fired the trigger (e.g. `click_button`, `scroll_depth`).

---

## Option A: One GA4 Event tag for all app events (recommended)

One tag fires on **any** custom event from your code and sends the **event name + parameters** to GA4. GA4 will show the same event names as in your app (`click_button`, `scroll_depth`, etc.).

### Step 1. Data Layer variables

**Variables** → **New** → **Data Layer Variable**. Create:

| Variable Name         | Data Layer Variable Name |
| --------------------- | ------------------------ |
| `DLV - label`         | `label`                  |
| `DLV - page_path`     | `page_path`              |
| `DLV - depth_percent` | `depth_percent`          |
| `DLV - section_id`    | `section_id`             |
| `DLV - form_name`     | `form_name`              |

Save each. Enable built-in **Event** (Variables → Configure → Event).

### Step 2. One trigger for all custom events

**Triggers** → **New** → **Custom Event**.

- **Event name:** leave empty or use a regex so only your app events fire:
  - Either: **This trigger fires on** → **All Custom Events** (any `dataLayer.push({ event: '...' })` will fire it).
  - Or: **This trigger fires on** → **Some Custom Events** → **Event** matches regex:
    ```text
    ^(click_button|scroll_depth|section_view|form_start|form_submit)$
    ```
    (So only these event names trigger the tag; avoids other tools that might push custom events.)

Name the trigger e.g. **CE - App custom events**. Save.

### Step 3. One GA4 Event tag

**Tags** → **New** → **Google Analytics: GA4 Event**.

| Field                 | Value                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Configuration Tag** | Your existing GA4 Configuration tag                                                    |
| **Event Name**        | `{{Event}}` ← built-in variable (the event name your code pushed, e.g. `click_button`) |
| **Event Parameters**  | Add all of these (empty values are fine when not in the push):                         |
|                       | `label` = `{{DLV - label}}`                                                            |
|                       | `page_path` = `{{DLV - page_path}}`                                                    |
|                       | `depth_percent` = `{{DLV - depth_percent}}`                                            |
|                       | `section_id` = `{{DLV - section_id}}`                                                  |
|                       | `form_name` = `{{DLV - form_name}}`                                                    |
| **Trigger**           | **CE - App custom events**                                                             |

Name the tag e.g. **GA4 Event - App events (dynamic)**. Save.

Result: every time your app does `dataLayer.push({ event: 'click_button', label: 'Book meeting' })` (or any of your other events), this **one** tag fires, sends **Event Name** = `click_button` (or whatever you pushed) and the parameters that were pushed. GA4 will show `click_button`, `scroll_depth`, `section_view`, etc. as separate events with the right parameters.

Optional: add a **Page Hostname** condition to the trigger if you want this tag only on investors or only on main app.

---

## Option B: Individual GA4 Event tags (per event)

If you prefer one tag per event (e.g. to set different triggers per event), use the steps below.

---

## 1. (Option B) Data Layer variables — same as Option A

In GTM: **Variables** → **New** → **Variable Configuration** → **Data Layer Variable**.

Create these (Name = what you’ll use in the tag):

| Variable Name         | Data Layer Variable Name |
| --------------------- | ------------------------ |
| `DLV - label`         | `label`                  |
| `DLV - page_path`     | `page_path`              |
| `DLV - depth_percent` | `depth_percent`          |
| `DLV - section_id`    | `section_id`             |
| `DLV - form_name`     | `form_name`              |

Save each. These read from the object you push to `dataLayer` (e.g. `{ event: 'click_button', label: 'Book meeting' }` → `label`).

---

## 2. Custom Event triggers

In GTM: **Triggers** → **New** → **Trigger Configuration** → **Custom Event**.

Create one trigger per event. **Event name** must match exactly what the app pushes.

| Trigger Name        | Event name     | Use case                             |
| ------------------- | -------------- | ------------------------------------ |
| `CE - click_button` | `click_button` | Button clicks (investors + app)      |
| `CE - scroll_depth` | `scroll_depth` | Scroll depth (investors + app)       |
| `CE - section_view` | `section_view` | Section visibility (investors + app) |
| `CE - form_start`   | `form_start`   | Form focus/start                     |
| `CE - form_submit`  | `form_submit`  | Form submit                          |

Optional: to fire **only on investors** or **only on main site**, add a condition to the trigger:

- **CE - click_button (Investors only):**  
  Trigger type: Custom Event, Event name `click_button`.  
  **This trigger fires on**: Some Custom Events → add condition **Page Hostname** `equals` `investors.getrandomtrip.com`.

- **CE - click_button (Main only):**  
  Same, but **Page Hostname** `equals` `getrandomtrip.com`.

If you don’t add a hostname condition, the tag fires on both sites (GA4 will still segment by hostname if you use it as a dimension).

Save each trigger.

---

## 3. GA4 Event tags

In GTM: **Tags** → **New** → **Tag Configuration** → **Google Analytics: GA4 Event**.

You need your **GA4 Configuration tag** (the one that loads gtag and has the Measurement ID). In each GA4 Event tag, under “Configuration Tag”, select that tag.

Create one GA4 Event tag per event. **Event Name** = same as in the app / as the Custom Event name.

### 3.1 click_button

| Field                 | Value                                                        |
| --------------------- | ------------------------------------------------------------ |
| **Tag type**          | GA4 Event                                                    |
| **Configuration Tag** | (your GA4 Config tag)                                        |
| **Event Name**        | `click_button`                                               |
| **Event Parameters**  | Add parameter: **Name** `label`, **Value** `{{DLV - label}}` |
| **Trigger**           | `CE - click_button`                                          |

Name the tag e.g. **GA4 Event - click_button**. Save.

---

### 3.2 scroll_depth

| Field                 | Value                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| **Tag type**          | GA4 Event                                                                             |
| **Configuration Tag** | (your GA4 Config tag)                                                                 |
| **Event Name**        | `scroll_depth`                                                                        |
| **Event Parameters**  | Add: `page_path` = `{{DLV - page_path}}`, `depth_percent` = `{{DLV - depth_percent}}` |
| **Trigger**           | `CE - scroll_depth`                                                                   |

Name the tag e.g. **GA4 Event - scroll_depth**. Save.

---

### 3.3 section_view

| Field                 | Value                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| **Tag type**          | GA4 Event                                                                       |
| **Configuration Tag** | (your GA4 Config tag)                                                           |
| **Event Name**        | `section_view`                                                                  |
| **Event Parameters**  | Add: `page_path` = `{{DLV - page_path}}`, `section_id` = `{{DLV - section_id}}` |
| **Trigger**           | `CE - section_view`                                                             |

Name the tag e.g. **GA4 Event - section_view**. Save.

---

### 3.4 form_start

| Field                 | Value                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Tag type**          | GA4 Event                                                                               |
| **Configuration Tag** | (your GA4 Config tag)                                                                   |
| **Event Name**        | `form_start`                                                                            |
| **Event Parameters**  | Add: `form_name` = `{{DLV - form_name}}`. Optional: `page_path` = `{{DLV - page_path}}` |
| **Trigger**           | `CE - form_start`                                                                       |

Name the tag e.g. **GA4 Event - form_start**. Save.

---

### 3.5 form_submit

| Field                 | Value                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Tag type**          | GA4 Event                                                                               |
| **Configuration Tag** | (your GA4 Config tag)                                                                   |
| **Event Name**        | `form_submit`                                                                           |
| **Event Parameters**  | Add: `form_name` = `{{DLV - form_name}}`. Optional: `page_path` = `{{DLV - page_path}}` |
| **Trigger**           | `CE - form_submit`                                                                      |

Name the tag e.g. **GA4 Event - form_submit**. Save.

---

## 4. Summary table (investors & app)

| dataLayer event | Trigger (Custom Event name) | GA4 Event tag | Parameters to send to GA4         |
| --------------- | --------------------------- | ------------- | --------------------------------- |
| `click_button`  | `click_button`              | GA4 Event     | `label`                           |
| `scroll_depth`  | `scroll_depth`              | GA4 Event     | `page_path`, `depth_percent`      |
| `section_view`  | `section_view`              | GA4 Event     | `page_path`, `section_id`         |
| `form_start`    | `form_start`                | GA4 Event     | `form_name`, optional `page_path` |
| `form_submit`   | `form_submit`               | GA4 Event     | `form_name`, optional `page_path` |

Same setup for **investors** and **main app**: same triggers and tags. To restrict a tag to one site, add a **Page Hostname** condition to the trigger (e.g. `CE - click_button` fires only when Page Hostname equals `investors.getrandomtrip.com` or `getrandomtrip.com`).

---

## 5. Publish and test

1. **Submit** the container (Submit → Publish).
2. Open the site (investors or main app), open GA4 **Realtime** → **Events**.
3. Perform the action (click a tracked button, scroll, submit a form). The event should appear in Realtime within a few seconds.
4. In GTM **Preview** mode, confirm the Custom Event trigger and GA4 Event tag fire when you do the action.

---

## Reference: what the app pushes (investor-room)

- `click_button` — when a `<Button trackLabel="…">` is clicked.
- `scroll_depth` — at 25%, 50%, 75%, 100% scroll (ScrollDepthTracker in layout).
- `section_view` — when you call `trackSectionView(page_path, section_id)`.
- `form_start` / `form_submit` — when you call `trackFormStart(form_name)` / `trackFormSubmit(form_name)`.

Main app (getrandomtrip): use the same event names and parameters in GTM so both sites send consistent events to the same GA4 property; segment by **Page Hostname** or **page_path** in GA4 reports.
