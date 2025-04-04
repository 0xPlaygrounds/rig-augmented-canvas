# Rig Augmented Canvas

A clean, minimalist, browser-based note-taking web application with an infinite canvas. Create visual maps of your notes, ideas, and content with a simple and intuitive interface.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/0xPlaygrounds/rig-augmented-canvas)

## Features

- **Infinite Canvas**: Navigate and organize your thoughts spatially
- **Note Cards**: Create, edit, and delete note cards with markdown support
- **Connections**: Connect notes with edges to visualize relationships
- **Resizable Notes**: Adjust note card sizes to fit your content
- **Focus Mode**: Distraction-free writing experience
- **Persistence**: All data is stored locally using IndexedDB
- **Markdown Support**: Format your notes with markdown syntax

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xPlaygrounds/rig-augmented-canvas.git
cd rig-augmented-canvas
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173/`

## Usage

- **Add Note**: Click the "Add Note" button in the top-right corner
- **Edit Note**: Click the edit icon on a note
- **Delete Note**: Click the trash icon on a note
- **Connect Notes**: Drag from the bottom handle of one note to the top handle of another
- **Resize Note**: Drag the resize handle in the bottom-right corner of a note
- **Focus Mode**: Click the maximize icon on a note for distraction-free writing
- **Pan Canvas**: Click and drag on empty canvas space
- **Zoom Canvas**: Use mouse wheel or pinch gesture

## Technologies Used

- React
- TypeScript
- ReactFlow
- TailwindCSS
- Vite
- IndexedDB

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by tools like Obsidian, Miro, and Notion
- Built with a focus on simplicity and usability
