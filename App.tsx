import React, { useCallback, useEffect, useState } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'

enum PomodoroAction {
    NONE,
    WORK,
    REST
}

const TIME_WORK = 21 * 60
const TIME_REST = 6 * 60

const App = () => {
    const [elapsedTime, setElapsedTime] = useState(0)
    const [count, setCount] = useState(0)
    const [action, setAction] = useState(PomodoroAction.NONE)
    const [running, setRunning] = useState(false)
    const [intervalId, setIntervalId] = useState(-1)

    const toggleRunning = () => {
        setRunning(!running)
        if (action === PomodoroAction.NONE) {
            setAction(PomodoroAction.WORK)
        }
    }

    const startTimer = useCallback(() => {
        const id = setInterval(() => {
            setElapsedTime(currentValue => currentValue + 1)
        }, 1000)

        setIntervalId(id)
    }, [])

    const stopTimer = useCallback(() => {
        clearInterval(intervalId)
    }, [intervalId])

    useEffect(() => {
        if (running) {
            startTimer()
        } else {
            stopTimer()
        }
    }, [running])

    const restartTimer = useCallback((newAction: PomodoroAction) => { 
        setAction(newAction)
        setElapsedTime(0)
    }, [])

    const updateAction = useCallback((currentTime: number) => {
        if (action === PomodoroAction.WORK &&
            currentTime === TIME_WORK) {

            restartTimer(PomodoroAction.REST)
            setCount(currentCount => currentCount + 1)
        } else if (action === PomodoroAction.REST &&
            currentTime === TIME_REST) {
            restartTimer(PomodoroAction.WORK)
        }
    }, [action])

    useEffect(() => { 
        updateAction(elapsedTime)
    }, [elapsedTime])

    const getTimeFormatted = useCallback(() => {
        const minutes = Math.floor(elapsedTime / 60).toString()
        const seconds = (elapsedTime % 60).toString()

        return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`        
    }, [elapsedTime])

    return (
        <View style={appStyles.content}>           
            <StatusBar backgroundColor="#b61827" barStyle={'light-content'} />

            <Text style={appStyles.title}>Pomodoro Timer</Text>

            {
                action !== PomodoroAction.NONE ?
                    <Text style={appStyles.action}>
                        Hora de {action === PomodoroAction.WORK ? 'trabalhar' : 'descansar'}
                    </Text>
                    : null
            }

            <Text style={appStyles.timer}>{getTimeFormatted()}</Text>

            <Button title={running ? 'Parar' : 'Iniciar'}
                onPress={toggleRunning} />

            <Text style={appStyles.message}>Você completou {count} pomodoro(s).</Text>
        </View>
    )
}

const appStyles = StyleSheet.create({
    content: {
        backgroundColor: '#ef5350',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,
        color: '#ffffff',
        paddingHorizontal: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    timer: {
        color: "#ffffff",
        fontSize: 96,
    },
    message: {
        color: "#ffffff",
        fontSize: 16,
        marginTop: 50,
    },
    action: {
        color: "#ffffff",
        fontSize: 16,
        marginTop: 50,
    }
})

export default App