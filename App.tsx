import React, { useState } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'

enum PomodoroAction {
    NONE,
    WORK,
    REST
}

const App = () => {
    const [elapsedTime, setElapsedTime] = useState(0)
    const [count, setCount] = useState(0)
    const [action, setAction] = useState(PomodoroAction.NONE)
    const [running, setRunning] = useState(false)

    const toggleRunning = () => {
        if (!running) {
            countTime()
        }

        setRunning(!running)
        if (action === PomodoroAction.NONE) {
            setAction(PomodoroAction.WORK)
        }
    }

    const countTime = () => { 
        setTimeout(() => {
            if (running) {
                setElapsedTime(elapsedTime + 1)
            }
        }, 1000)
    }


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

            <Text style={appStyles.timer}>99:99</Text>

            <Button title={running ? 'Parar' : 'Iniciar'}
                onPress={toggleRunning} />

            <Text style={appStyles.message}>Você completou 99 pomodoro(s).</Text>
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