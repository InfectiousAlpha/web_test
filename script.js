const { useState, useEffect, useRef } = React;

// --- Icon Components (Inline SVGs) ---
const IconWrapper = ({ children, size = 24, className = "" }) => (
    <svg 
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        {children}
    </svg>
);

const LayoutDashboard = (props) => <IconWrapper {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></IconWrapper>;
const Sun = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconWrapper>;
const Moon = (props) => <IconWrapper {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></IconWrapper>;
const TimerIcon = (props) => <IconWrapper {...props}><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></IconWrapper>;
const Play = (props) => <IconWrapper {...props}><polygon points="5 3 19 12 5 21 5 3"/></IconWrapper>;
const Pause = (props) => <IconWrapper {...props}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></IconWrapper>;
const RotateCcw = (props) => <IconWrapper {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></IconWrapper>;
const ListTodo = (props) => <IconWrapper {...props}><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></IconWrapper>;
const Plus = (props) => <IconWrapper {...props}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
const CheckCircle2 = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></IconWrapper>;
const Circle = (props) => <IconWrapper {...props}><circle cx="12" cy="12" r="10"/></IconWrapper>;
const Trash2 = (props) => <IconWrapper {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;


// --- Sub-Components ---

// 1. Header Component
const Header = ({ darkMode, setDarkMode }) => (
    <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <LayoutDashboard size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">FocusBoard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your workflow</p>
            </div>
        </div>
        <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all"
            title="Toggle Theme"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    </header>
);

// 2. Timer Component (Pomodoro)
const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // 'focus' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') {
                setMode('break');
                setTimeLeft(5 * 60);
            } else {
                setMode('focus');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                <TimerIcon size={20} />
                <h2 className="font-semibold uppercase tracking-wider text-sm">Focus Timer</h2>
            </div>
            
            <div className="text-center py-6">
                <div className="text-6xl font-mono font-bold text-gray-800 dark:text-white mb-2">
                    {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
                    {mode === 'focus' ? 'Focus Time' : 'Short Break'}
                </p>
                
                <div className="flex justify-center gap-3">
                    <button 
                        onClick={toggleTimer}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                            isActive 
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none'
                        }`}
                    >
                        {isActive ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// 3. Todo List Component
const TodoList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Review React components", completed: true },
        { id: 2, text: "Write documentation", completed: false },
        { id: 3, text: "Deploy to production", completed: false },
    ]);
    const [inputValue, setInputValue] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setInputValue("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 h-full flex flex-col">
            <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ListTodo size={20} />
                    <h2 className="font-semibold uppercase tracking-wider text-sm">Tasks</h2>
                </div>
                <span className="text-xs font-medium text-gray-400">
                    {completedCount}/{tasks.length} Done
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-6">
                <div 
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                />
            </div>

            <form onSubmit={addTask} className="relative mb-6">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} />
                </button>
            </form>

            <ul className="space-y-3 overflow-y-auto flex-1 max-h-[300px] custom-scrollbar">
                {tasks.length === 0 && (
                    <li className="text-center text-gray-400 dark:text-gray-600 py-8 text-sm italic">
                        No tasks yet. Stay focused!
                    </li>
                )}
                {tasks.map(task => (
                    <li 
                        key={task.id} 
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <button 
                                onClick={() => toggleTask(task.id)}
                                className={`flex-shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600 hover:text-indigo-500'}`}
                            >
                                {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                            </button>
                            <span className={`truncate ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                                {task.text}
                            </span>
                        </div>
                        <button 
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// --- Main App Component ---

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('bg-gray-900');
            document.body.classList.remove('bg-gray-50');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.add('bg-gray-50');
            document.body.classList.remove('bg-gray-900');
        }
    }, [darkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark text-white' : ''}`}>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Timer & Stats */}
                    <div className="space-y-6">
                        <PomodoroTimer />
                        
                        {/* Simple Stat Widget */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                            <h3 className="font-semibold text-lg mb-1">Weekly Insight</h3>
                            <p className="text-indigo-100 text-sm mb-4">You are most productive on Tuesday mornings.</p>
                            <div className="flex gap-2 text-xs font-mono opacity-80">
                                <span className="bg-white/20 px-2 py-1 rounded">Focus: 85%</span>
                                <span className="bg-white/20 px-2 py-1 rounded">Tasks: 12</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Todo List */}
                    <div className="h-full">
                        <TodoList />
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
                    Built with React & Tailwind CSS
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
