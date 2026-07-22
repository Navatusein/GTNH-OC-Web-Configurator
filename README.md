# GTNH-OC-Web-Configurator

## Content

- [Information](#information)
- [Usage](#usage)
- [Writing descriptors](#writing-descriptors)
- [Development](#development)

<a id="information"></a>

## Information

Web configurator for GTNH OpenComputers programs. Instead of editing `config.lua`
by hand, you fill in a form in the browser and the configurator generates a ready
Lua config for you.

A program describes its configuration form with a **config descriptor** — a YAML
file that lists the fields, their types and constraints, and the template of the
final config. The configurator loads that descriptor by URL, builds the form, and
substitutes the entered values into the template on export.

Hosted version: [GTNH-OC-Web-Configurator](https://navatusein.github.io/GTNH-OC-Web-Configurator/)

<a id="usage"></a>

## Usage

1. Host your config descriptor somewhere that serves it as raw text (Pastebin or a
   GitHub repository).
2. Copy the link to the **raw** file
   (`https://pastebin.com/raw/...` or `https://raw.githubusercontent.com/...`).
3. Paste that link on the
   [create-link page](https://navatusein.github.io/GTNH-OC-Web-Configurator/#/create-link)
   and press **Generate link and validate**. The page validates the descriptor and
   returns a configurator link.
4. Open the link, fill in the form and export the config.

> [!NOTE]
> You can share the generated configurator link directly (for example in your
> program's README) so users open the form in one click.

<a id="writing-descriptors"></a>

## Writing descriptors

A full guide on the descriptor format — field types, their parameters, the config
template and placeholders — is in
[docs/config-descriptors.md](docs/config-descriptors.md).

<a id="development"></a>

## Development

The project is built with React, Vite and Ant Design.

```shell
npm install
npm run dev
```

Other scripts:

```shell
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run eslint
```