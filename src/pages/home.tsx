import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Button, Input, Space, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { flushSync } from 'react-dom';



function Home() {

  const [chats, setChats] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const chatsRef = useRef<any[]>([]);

  const contanierRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    chatsRef.current = chats;
  }, [chats])

  console.log(uuidv4())

  useLayoutEffect(() => {
    if (contanierRef.current) {
      contanierRef.current.scrollTop = contanierRef.current?.scrollHeight;
    }
  }, [chats]);


  async function send() {

    const lastChat = chats.at(-1);

    setChats(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: input,
        self: true,
      },
      {
        id: uuidv4(),
        text: '',
        self: false,
        loading: true,
      }]);
    setInput('');

    let url = `/api?message=${input}`;
    if (lastChat) {
      url += `&parentMessageId=${lastChat.id}`;
    }
    const result = await fetch(url).then(res => res.json());
    result.loading = false;

    chatsRef.current[chatsRef.current.length - 1] = result;

    setChats([...chatsRef.current]);

    

    console.log(chats);


    setInput('');

    console.log(result);
  }

  console.log(contanierRef.current?.scrollHeight)

  return (
    <div className="h-[100%] flex flex-col justify-between ">
      <div ref={contanierRef} className='flex-1 overflow-auto px-[24px] py-[24px]'>
        <Space size="large" direction="vertical">
          {
            chats.map(chat => (
              chat.self ? (
                <div key={chat.id} className="flex gap-[8px]">
                  <div className="basis-[60px] text-right mt-[4px]">我：</div>
                  <div className="bg-[#1890ff28] py-[8px] px-[12px] rounded">
                    {chat.text}
                  </div>
                </div>
              ) : (
                <div key={chat.id} className="flex gap-[8px]">
                  <div className="basis-[60px] text-right mt-[4px]">小搭：</div>
                  <div className="bg-[rgb(244,246,248)] py-[4px] px-[16px] rounded">
                    <Spin spinning={chat.loading} tip="获取信息中">
                      <ReactMarkdown
                        rehypePlugins={
                          [[rehypeHighlight, { ignoreMissing: true }]]
                        }
                        remarkPlugins={[remarkGfm]}
                        className={chat.loading ? 'min-w-[200px] min-h-[60px]' : ''}
                      >
                        {chat.text}
                      </ReactMarkdown>
                    </Spin>
                  </div>
                </div>
              )
            ))
          }
        </Space>
      </div>
      <div className="h-[40px] flex items-center justify-between gap-[16px] basis-[40px]">
        <Input size='large' value={input} onPressEnter={send} onChange={e => { setInput(e.target.value) }} />
        <Button size='large' onClick={send} type="primary">send</Button>
      </div>
    </div>
  )
}

export default Home;