import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
    const { isDark } = useTheme();
    const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className={`absolute -top-20 left-[-15%] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full ${blendMode} filter blur-[120px] opacity-25 animate-blob ${isDark ? 'bg-violet-600' : 'bg-violet-200'}`}></div>
            <div className={`absolute -top-10 right-[-15%] w-[280px] h-[280px] sm:w-[550px] sm:h-[550px] rounded-full ${blendMode} filter blur-[120px] opacity-25 animate-blob animation-delay-2000 ${isDark ? 'bg-rose-600' : 'bg-rose-200'}`}></div>
            <div className={`absolute -bottom-32 left-[15%] w-[280px] h-[280px] sm:w-[550px] sm:h-[550px] rounded-full ${blendMode} filter blur-[120px] opacity-20 animate-blob animation-delay-4000 ${isDark ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>
            <div className={`absolute bottom-[15%] right-[5%] w-[240px] h-[240px] sm:w-[450px] sm:h-[450px] rounded-full ${blendMode} filter blur-[120px] opacity-20 animate-blob animation-delay-1000 ${isDark ? 'bg-fuchsia-600' : 'bg-fuchsia-100'}`}></div>
            <div className={`absolute top-[40%] left-[40%] w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full ${blendMode} filter blur-[140px] opacity-10 animate-blob animation-delay-2000 ${isDark ? 'bg-purple-500' : 'bg-purple-100'}`}></div>
        </div>
    );
};

export default BackgroundAnimation;
