# How to write config descriptors

## Content

- [Information](#information)
- [File structure](#file-structure)
- [Common field parameters](#common-field-parameters)
- [Field types](#field-types)
- [Config template](#config-template)
- [How to test a descriptor](#how-to-test)

<a id="information"></a>

## Information

A config descriptor is a YAML file that describes a program's configuration form:
which fields it consists of, what types and constraints those fields have, and how
the final Lua config is assembled from the entered values.

The web configurator loads such a file by URL, builds a form from it, and on export
substitutes the entered values into the `configTemplate`.

The validation schema (the source of truth) lives in `src/entities/**/schema/schema.ts`.
If anything in this guide disagrees with the schema — the schema wins.

---

<a id="file-structure"></a>

## File structure

The whole descriptor lives under the root `descriptor` key:

```yaml
descriptor:
  name: Black Hole Control 2.9+
  key: black-hole-control-2.9
  description: Program for automating ...
  repositoryLink: https://github.com/Navatusein/GTNH-OC-Black-Hole-Control
  currentVersion: 2.9+
  versions:
    - name: 2.9+
      url: "https://.../config-descriptor.yaml"
  fieldGroups:
    - key: logger
      name: Logger
      defaultOpen: true
      fields:
        - key: name
          type: string
          label: Name
          description: Name which will be displayed in discord
        # ... other fields
  configTemplate: |
    local config = { ... }
    return config
```

### Top-level fields (`descriptor`)

| Key | Type | Required | Description |
|------|-----|:---:|----------|
| `name` | string | yes | Program name, shown in the UI |
| `key` | string | yes | Unique program identifier (kebab-case) |
| `description` | string | yes | Short program description |
| `currentVersion` | string | yes | Current descriptor version |
| `versions` | list | yes | List of versions (see below). Lets the user switch between config versions |
| `configTemplate` | string | yes | Template of the final Lua config with `<field>...</field>` placeholders |
| `fieldGroups` | list | yes | Groups of form fields |
| `repositoryLink` | string | no | Link to the program's repository |
| `lastSupportedVersion` | string | no | Last supported version (for deprecated descriptors) |

### `versions`

Each entry:

| Key | Type | Required | Description |
|------|-----|:---:|----------|
| `name` | string | yes | Version name, shown in the dropdown |
| `url` | string | yes | URL of this version's YAML descriptor |

> ⚠️ For a version to be selected, its `name` must match the descriptor's
> `currentVersion`.

### `fieldGroups`

A group is a collapsible card with a set of fields.

| Key | Type | Required | Description |
|------|-----|:---:|----------|
| `key` | string | yes | Group identifier |
| `name` | string | yes | Card title |
| `fields` | list | yes | List of fields (see "Field types") |
| `description` | string | no | Group description |
| `defaultOpen` | boolean | no | Whether the card is expanded by default |

---

<a id="common-field-parameters"></a>

## Common field parameters

These parameters exist on **any** field, regardless of type:

| Key | Type | Required | Description |
|------|-----|:---:|----------|
| `key` | string | yes | Field identifier. This is what the template references as `<field>key</field>` |
| `type` | string | yes | Field type (see the types table) |
| `label` | string | yes | Field caption in the form |
| `description` | string | yes | Hint shown under the field. Supports **Markdown** (e.g. `[text](link)`) |
| `optional` | boolean | no | If `true`, the field is optional. By default a field is required |
| `default` | depends on type | no | Default value |

---

<a id="field-types"></a>

## Field types

Available `type` values:
`string`, `integer`, `float`, `boolean`, `address`, `url`, `side`, `color`,
`select`, `objectList`, `multipleObjectList`.

### `string` — text

Single-line input.

| Parameter | Type | Description |
|----------|-----|----------|
| `default` | string | Default value |
| `min` | number | Minimum string length |
| `max` | number | Maximum string length |

```yaml
- key: name
  type: string
  default: Black Hole Control
  min: 3
  label: Name
  description: Name which will be displayed in discord
```

### `integer` — whole number

Numeric input, always rounded to an integer (`precision = 0`).

| Parameter | Type | Description |
|----------|-----|----------|
| `default` | number | Default value |
| `min` | number | Minimum |
| `max` | number | Maximum |
| `step` | number | Step (default `1`) |

```yaml
- key: maxCyclesCount
  type: integer
  default: 0
  min: 0
  label: Max Cycles Count
  description: Maximum number of cycles
```

### `float` — decimal number

| Parameter | Type | Description |
|----------|-----|----------|
| `default` | number | Default value |
| `min` | number | Minimum |
| `max` | number | Maximum |
| `step` | number | Step |
| `precision` | number | Number of decimal places (default `1`) |

```yaml
- key: timeZone
  type: float
  default: 3
  step: 0.5
  label: Time Zone
  description: Your time zone
```

### `boolean` — checkbox

Rendered as a checkbox. `default` is a boolean.

```yaml
- key: saveRecipeMode
  type: boolean
  optional: true
  default: false
  label: Save Mode
  description: Recipe save mode
```

### `address` — component address

Text input with UUID validation (format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`,
partial input allowed). `default` is a string.

```yaml
- key: meInterfaceAddress
  type: address
  label: ME Interface Address
  description: Address of ME Interface
```

### `url` — link

Text input with URL validation. `default` is a string.

```yaml
- key: discordWebhookUrl
  type: url
  default: ""
  optional: true
  label: Discord Webhook Url
  description: Discord Webhook Url for notifications
```

### `side` — block side

Dropdown of OpenComputers sides. `default` is a string, e.g. `sides.east`.

Possible values: `sides.north`, `sides.south`, `sides.west`, `sides.east`,
`sides.up`, `sides.down`.

```yaml
- key: meDriveSide
  type: side
  default: sides.east
  label: ME Drive Side
  description: Side of the transposer which connected to ME Drive
```

> In `configTemplate` the raw value (`sides.east`) is substituted — **without quotes** —
> since it is a Lua expression.

### `color` — color

Dropdown of the 16 OpenComputers colors. `default` is a string, e.g. `colors.white`.

Possible values: `colors.white`, `colors.orange`, `colors.magenta`,
`colors.lightblue`, `colors.yellow`, `colors.lime`, `colors.pink`, `colors.gray`,
`colors.silver`, `colors.cyan`, `colors.purple`, `colors.blue`, `colors.brown`,
`colors.green`, `colors.red`, `colors.black`.

```yaml
- key: blackHoleSeedInputBusSide
  type: color
  label: Black Hole Seed Input Bus Side
  description: Side of the input bus
```

> Like `side`, it is substituted without quotes.

### `select` — pick from a list

Dropdown with custom options.

| Parameter | Type | Required | Description |
|----------|-----|:---:|----------|
| `options` | list | yes | List of options `{label, value}` |
| `default` | string | no | Default value (one of the `value`s) |

```yaml
- key: logLevel
  type: select
  default: info
  label: Log Level
  description: Minimal log level
  options:
    - label: Debug
      value: debug
    - label: Info
      value: info
    - label: Warning
      value: warning
```

### `objectList` — list of same-shaped objects

Lets the user add an arbitrary number of objects that share the same structure
(e.g. a list of machines). Each object is described by a set of nested fields and
its own template.

| Parameter | Type | Required | Description |
|----------|-----|:---:|----------|
| `fields` | list | yes | Nested fields of the object (same types as regular fields) |
| `objectTemplate` | string | yes | Template of a single object with placeholders for the nested fields |
| `itemLabel` | string | no | Item caption (used in the "Create new ..." button and headers) |
| `useSpaces` | boolean | no | Preserve indentation (see "Indentation and `useSpaces`") |

```yaml
- key: machines
  type: objectList
  label: Machines
  description: List of controlled machines
  itemLabel: Machine
  useSpaces: true
  fields:
    - key: name
      type: string
      label: Name
      description: Machine name
    - key: address
      type: address
      label: Address
      description: Machine address
  objectTemplate: |
    machine:newFormConfig({
      name = "<field>name</field>",
      address = "<field>address</field>",
    }),
```

In `configTemplate` the insertion point of the list is marked by a placeholder with
the field key:

```lua
machines = {
  <field>machines</field>
},
```

### `multipleObjectList` — list of objects of different types

Same as `objectList`, but for each item the user picks a **type** of object from a
list. Each type has its own field structure and its own template.

| Parameter | Type | Required | Description |
|----------|-----|:---:|----------|
| `objects` | list | yes | Descriptions of the available object types (see below) |
| `itemLabel` | string | yes | Item caption |
| `useSpaces` | boolean | no | Preserve indentation |

Each `objects` entry:

| Key | Type | Required | Description |
|------|-----|:---:|----------|
| `key` | string | yes | Object type identifier |
| `name` | string | yes | Type name |
| `label` | string | yes | Type caption in the dropdown |
| `fields` | list | yes | Nested fields of this type |
| `objectTemplate` | string | yes | Template for objects of this type |
| `description` | string | no | Type description |

```yaml
- key: handlers
  type: multipleObjectList
  label: Logger Handlers
  description: Log output handlers
  itemLabel: Handler
  useSpaces: true
  objects:
    - key: discord
      name: Discord Handler
      label: Discord
      fields:
        - key: discordWebhookUrl
          type: url
          label: Webhook Url
          description: Discord webhook url
      objectTemplate: |
        discordLoggerHandler:newFormConfig({
          discordWebhookUrl = "<field>discordWebhookUrl</field>",
        }),
    - key: file
      name: File Handler
      label: File
      fields:
        - key: filePath
          type: string
          label: File Path
          description: Path to log file
      objectTemplate: |
        fileLoggerHandler:newFormConfig({
          filePath = "<field>filePath</field>",
        }),
```

---

<a id="config-template"></a>

## Config template (`configTemplate`) and placeholders

`configTemplate` is the text of the final Lua file. Field values are inserted in
place of placeholders of the form `<field>FIELD_KEY</field>`, where `FIELD_KEY` is
the field's `key`.

```lua
logger = loggerLib:newFormConfig({
  name = "<field>name</field>",
  timeZone = <field>timeZone</field>,
})
```

### Quotes: when they are needed

A placeholder is replaced with the "raw" value. Quotes must be in the template —
the configurator does **not** add them itself:

- **Wrap in quotes** (string values): `string`, `address`, `url`
  → `"<field>key</field>"`
- **No quotes** (Lua expressions / numbers / booleans): `integer`, `float`, `boolean`,
  `side` (`sides.east`), `color` (`colors.white`), `select` (the `value` is inserted
  as-is)
  → `<field>key</field>`

> ⚠️ `side` and `color` produce Lua expressions like `sides.east` and `colors.white`,
> so the corresponding modules **must** be required in `configTemplate` for the
> generated config to work:
>
> ```lua
> local sides = require("sides")
> local colors = require("colors")
> ```

### List placeholders

For `objectList` / `multipleObjectList` the placeholder in `configTemplate` is
replaced with the concatenation of the rendered `objectTemplate`s of all added
objects. Inside an `objectTemplate` you use the placeholders of the nested fields.

### Indentation and `useSpaces`

If `useSpaces: true`, the configurator remembers the indentation the list
placeholder had in the template and applies that same indentation to every line of
every inserted object. This keeps the Lua formatting tidy.

Example: if in the template

```lua
  handlers = {
    <field>handlers</field>
  }
```

the placeholder is indented by 4 spaces, then each handler's whole multi-line
template is shifted by 4 spaces.

---

<a id="how-to-test"></a>

## How to test a descriptor

1. Upload the descriptor YAML somewhere that serves it as raw text — for example
   [Pastebin](https://pastebin.com) or a GitHub repository.
2. Copy the link to the **raw** version of the file:
   - Pastebin: open the paste and use the **raw** URL (`https://pastebin.com/raw/...`).
   - GitHub: open the file and click **Raw**
     (`https://raw.githubusercontent.com/...`).
3. Paste that raw link on the
   [create-link page](https://navatusein.github.io/GTNH-OC-Web-Configurator/#/create-link)
   and press **Generate link and validate**.
   - If the descriptor is invalid, the page shows a list of validation errors
     (field path + message).
   - If it is valid, the page returns a configurator link — open it, fill in the
     form and export the config to make sure the resulting Lua assembles correctly
     (in particular, quotes and indentation).

Validation runs against the Zod schema in
`src/entities/config-descriptor/schema/schema.ts`.