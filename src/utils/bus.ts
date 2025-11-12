type EventCallback = (...args: unknown[]) => void

class LucaBus {
  private events: { [key: string]: EventCallback[] } = {}

  on(eventName: string, callback: EventCallback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  off(eventName: string, callback?: EventCallback) {
    if (!this.events[eventName]) return

    if (callback) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      )
    } else {
      delete this.events[eventName]
    }
  }

  emit(eventName: string, ...args: unknown[]) {
    if (!this.events[eventName]) return

    this.events[eventName].forEach(callback => {
      callback(...args)
    })
  }
}

export const eventBus = new LucaBus()
