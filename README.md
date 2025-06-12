# MyNotes - Mobile App

A React Native mobile application for note-taking

## Features

- ✅ Create, read, update, and delete notes
- ✅ Priority system with color coding (Important, Normal, Reminder)
- ✅ Local data persistence using AsyncStorage
- ✅ Responsive design for mobile and tablet
- ✅ English language interface
- ✅ Montserrat typography
- ✅ Modern Material Design UI

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **Storage**: AsyncStorage for local data persistence
- **State Management**: React Context + useReducer
- **UI Components**: Custom components with React Native
- **Icons**: Expo Vector Icons
- **Typography**: Montserrat font family

## Installation & Setup

1. **Prerequisites**
   - Node.js (v16 or higher)
   - Expo CLI: `npm install -g @expo/cli`
   - Expo Go app on your mobile device

2. **Clone and Install**
   \`\`\`bash
   git clone [your-repo-url]
   cd mynotes-app
   npm install
   \`\`\`

3. **Start Development Server**
   \`\`\`bash
   npm start
   # or
   expo start
   \`\`\`

4. **Run on Device**
   - Scan QR code with Expo Go app (Android)
   - Scan QR code with Camera app (iOS)

## App Structure

### Screens
1. **Dashboard** - Main screen displaying all notes
2. **Note Details** - View individual note with edit/delete options
3. **Form** - Create new note or edit existing note

### Priority Levels
- **Important** (Red #FF3B30) - High priority tasks
- **Normal** (Blue #007AFF) - Standard notes
- **Reminder** (Green #34C759) - Low priority reminders

## Usage Instructions

### Creating a Note
1. Tap the "+" button on the Dashboard
2. Enter title and content
3. Select priority level
4. Tap "Save Note"

### Viewing Notes
- All notes are displayed as cards on the Dashboard
- Tap any note card to view full details
- Notes show title, date, truncated content, and priority color

### Editing Notes
1. Open note details
2. Tap "Edit" button
3. Modify content as needed
4. Tap "Save Note"

### Deleting Notes
1. Open note details
2. Tap "Delete" button
3. Confirm deletion in the modal dialog

## Data Storage

- All notes are stored locally using AsyncStorage
- Data persists between app sessions
- No cloud synchronization in this version

## Testing

The app has been tested on:
- Android devices (various screen sizes)
- iOS devices (iPhone and iPad)
- Portrait and landscape orientations
- Expo Go development environment

## Build for Production

\`\`\`bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── NoteCard.js
│   └── EmptyState.js
├── context/
│   └── NotesContext.js
├── screens/
│   ├── DashboardScreen.js
│   ├── NoteScreen.js
│   └── FormScreen.js
└── App.js
\`\`\`

## Development Notes

- Uses React Navigation for screen transitions
- Context API for state management
- AsyncStorage for data persistence
- Custom components for reusability
- Responsive design principles
- Accessibility considerations

## Author

Developed for AZIENDA company as part of the Bachelor Year 3 project at L'École Multimédia.
