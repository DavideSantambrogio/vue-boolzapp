const messageBox = document.querySelector('.message-box');
const { createApp } = Vue;
const dt = luxon.DateTime
const app = createApp({
    data() {
        // dati

        return {
            contacts: [
                {
                    name: 'ChatGPT',
                    avatar: 'img/chatgpt-logo.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao! Come posso aiutarti oggi?',
                            status: 'received'
                        },                        

                    ],
                },

                {
                    name: 'Michele',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },

                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Alessandro B.',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Alessandro L.',
                    avatar: 'img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Claudia',
                    avatar: 'img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },

                {
                    name: 'Federico',
                    avatar: 'img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },

                {
                    name: 'Davide',
                    avatar: 'img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },      
            ],

            activeContact: "",
            newMessage: "",
            searchText: "",
            
        }
    },

    created() {
        // all'avvio della pagina
        this.activeContact = this.contacts[0];
        this.scrollToBottom();
    },
    methods: {
        setActiveContact(contact) {
            this.activeContact = contact;
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.activeContact.messages.push({
                    message: this.newMessage,
                    status: 'sent',
                    date: dt.now().toFormat("dd/MM/yyyy HH:mm:ss"),
                });

                // Pausa di 100ms per dare tempo al DOM di aggiornarsi
                setTimeout(() => {
                    // Scrolla automaticamente alla fine della casella dei messaggi
                    this.scrollToBottom();
                }, 100);

                if (this.activeContact.name === 'ChatGPT') {
                    fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer IL_TUO_API_KEY', // Inserisci qui la tua chiave API di OpenAI
                        },
                        body: JSON.stringify({
                            model: 'gpt-3.5-turbo-0125',
                            messages: [
                                {
                                    role: 'user',
                                    content: this.newMessage
                                }
                            ],
                            max_tokens: 500,
                            temperature: 0.7,
                            top_p: 1,
                            frequency_penalty: 0.5,
                            presence_penalty: 0.5,
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        this.activeContact.messages.push({
                            message: data.choices[0].message.content,
                            status: 'received',
                            date: dt.now().toFormat("dd/MM/yyyy HH:mm:ss"),
                        });
                        // Pausa di 100ms per dare tempo al DOM di aggiornarsi
                        setTimeout(() => {
                            // Scrolla automaticamente alla fine della casella dei messaggi
                            this.scrollToBottom();
                        }, 100);
                    })
                    .catch(error => {
                        console.error('Errore durante la richiesta all\'API di OpenAI:', error);
                    });
                } else {
                    setTimeout(() => {
                        const activeContactIndex = this.contacts.indexOf(this.activeContact);
                        const replyIndex = this.contacts[activeContactIndex];
                        replyIndex.messages.push({
                            message: 'Ok',
                            status: 'received',
                            date: dt.now().toFormat("dd/MM/yyyy HH:mm:ss"),
                        });
                        // Pausa di 100ms per dare tempo al DOM di aggiornarsi
                        setTimeout(() => {
                            // Scrolla automaticamente alla fine della casella dei messaggi
                            this.scrollToBottom();
                        }, 100);
                    }, 1000);
                }

                this.newMessage = '';
            }
        },
        dateToHourMin(fullDate) {
            const luxonDate = dt.fromFormat(fullDate, "dd/MM/yyyy HH:mm:ss");
            return luxonDate.toFormat("HH:mm");
        },
        searchContact() {
            let search = this.searchText.toLowerCase();
            this.contacts.forEach(element => {
                if (element.name.toLowerCase().includes(search)) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },
        deleteMessage(index) {
            this.activeContact.messages.splice(index, 1);
        },
        truncate(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        scrollToBottom() {
            const messageBox = document.querySelector('.message-box');
            if (messageBox) {
                messageBox.scrollTop = messageBox.scrollHeight;
            }
        }
    },
    mounted() {
        // Assicurati di scrollare alla fine della casella dei messaggi una volta che l'elemento è completamente caricato
        this.scrollToBottom();
    }
}).mount("#app");
