# Simple Website Project - How to Contribute 💻

FOR MARK BALBIN a.k.a TOJI AND NICOS BOBIS a.k.a DADDY! Welcome to the project. Here’s how you can set up your own copy of the website and contribute without messing up the main branch. Follow these steps, and you’ll be good to go! 🚀

## Before You Start
First, make sure you have **Git** and **Bash** installed on your computer. If you don’t have Bash yet, [download it here](https://gitforwindows.org/) (Windows users) or use your terminal if you're on Mac/Linux.

## Getting Started

### 1. Clone the Repository 🛠️
You need to get a local copy of the project on your computer.

```bash
# Clone the repository (replace with the actual repo link)
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
```

### 2. Create Your Own Branch 🌱
Always create a new branch before making changes. This keeps the `main` branch clean.

```bash
# Move into the project folder
cd REPO-NAME

# Create and switch to a new branch (pick a name that makes sense)
git checkout -b your-branch-name
```

### 3. Make Changes & Save Them 💾
Once you make edits, save them like this:

```bash
# Check what changed
git status

# Add all changes
git add .

# Save with a message (describe what you did)
git commit -m "Added new feature/fixed a bug"
```

### 4. Upload Your Work 📤
Push your branch to GitHub so I can see it.

```bash
# Push your branch
git push origin your-branch-name
```

### 5. Create a Pull Request 🔄
Now, go to GitHub:
1. Open the repository in your browser.
2. Click on **Pull Requests**.
3. Click **New Pull Request**.
4. Choose your branch as the source and `main` as the destination.
5. Click **Create Pull Request** and write a short description of what you changed.
6. Wait for me to check it and approve before it gets added to `main`.

### 6. Keep Your Branch Updated 🔄
If the `main` branch gets updated while you're working, update your branch too:

```bash
# Switch to the main branch
git checkout main

# Get the latest updates
git pull origin main

# Go back to your branch
git checkout your-branch-name

# Merge the latest changes
git merge main
```

## Some Friendly Reminders ✨
- **Never** edit the `main` branch directly.
- Use clear commit messages so we know what you changed.
- If you're stuck, just ask! We're in this together. 😃
