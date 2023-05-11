import { useState, useRef, useEffect, useContext, FormEvent } from 'react'
import ChatMessage from 'modals/ChatGPTModal/components/ChatMessage'
import { ChatContext } from 'modals/ChatGPTModal/context/ChatContext'
import Thinking from 'modals/ChatGPTModal/components/Thinking'
import { MdSend } from 'react-icons/md'
import Filter from 'bad-words'
import { davinci } from 'modals/ChatGPTModal/utils/davinci'
import { dalle } from 'modals/ChatGPTModal/utils/dalle'
import { ChatMessageType } from '../types'

type AiModelOption = 'ChatGPT' | 'DALL·E'

const options: AiModelOption[] = ['ChatGPT', 'DALL·E']

const ChatView = () => {
  const messagesEndRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [formValue, setFormValue] = useState('')
  const [thinking, setThinking] = useState(false)
  const [selected, setSelected] = useState(options[0])
  const { messages, addMessage } = useContext(ChatContext)

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue: string, ai = false, selected: AiModelOption) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000)
    const newMsg: ChatMessageType = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    }

    addMessage(newMsg)
  }

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()

    // const key = window.localStorage.getItem('api-key')
    const key = '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'
    // if (!key) {
    //   setModalOpen(true)
    //   return
    // }

    const filter = new Filter()
    const cleanPrompt = filter.isProfane(formValue) ? filter.clean(formValue) : formValue

    const newMsg = cleanPrompt
    const aiModel = selected

    setThinking(true)
    setFormValue('')
    updateMessage(newMsg, false, aiModel)

    console.log(selected)
    try {
      if (aiModel === options[0]) {
        const response = await davinci(cleanPrompt, key)
        const data = response.data.choices[0].message?.content
        if (data) updateMessage(data, true, aiModel)
      } else {
        const response = await dalle(cleanPrompt, key)
        const data = response.data.data[0].url
        if (data) updateMessage(data, true, aiModel)
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`)
    }

    setThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      sendMessage(e)
    }
  }

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages, thinking])

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className='chatview'>
      <main className='chatview__chatarea'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <form className='form' onSubmit={sendMessage}>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value as AiModelOption)}
          className='dropdown'
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className='flex items-stretch justify-between w-full'>
          <textarea
            ref={inputRef}
            className='chatview__textarea-message'
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={e => setFormValue(e.target.value)}
          />
          <button type='submit' className='chatview__btn-send' disabled={!formValue}>
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatView
