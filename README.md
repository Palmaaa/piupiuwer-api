# Piupiuwer API

---

## Rotas públicas

### POST /register
Request
```
{
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    about: string;
    photo: string;
}
```
Response
```
{
  user: {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    about: string,
    photo: string,
    password: string,
    id: string
    created_at: string
    updated_at: string
  },
  verificationToken: string
}
```

### GET /verification

Para verificar a conta, basta acessar o link enviado ao email cadastrado que utiliza o seguinte endpoint `/verification/:token`

Response
```
{
  id: string,
  email_verified: boolean
}
```

### POST /login

Request
```
{
	email: string,
	password: string
}
```
Response
```
{
  user: {
    username: string,
    email_verified: string,
    first_name: string,
    last_name: string,
    email: string,
    about: string,
    photo: string,
    password: string,
    id: string
    created_at: string
    updated_at: string
  },
  token: string
}
```
\* Só é possível fazer login depois de confirmar seu cadastro


## Rotas privadas

Para as rotas privadas é necessário a autorização com o token retornado pelo login no header da request: `authorization: Bearer ${token}`

### GET /users

Busca por um usuário usando o filtro `/users/?username=${username}`

Response
```
user: {
    id: string,
    username: string,
    email_verified: string,
    first_name: string,
    last_name: string,
    email: string,
    about: string,
    photo: string,
    password: string,
    id: string,
    created_at: string,
    updated_at: string,
    pius: [],
    likes: []
}
```

### POST /piu
Permite a postagem de um piu

Request

```
{
    text: string
}
```

Response

```
{
  piu: {
    user_id: string,
    text: string,
    id: string,
    created_at: string,
    updated_at: string
  }
}
```

### GET /piu

Retorna todos os pius postados

Response
```
[
  {
    {
        user_id: string,
        text: string,
        id: string,
        created_at: string,
        updated_at: string
    }
    user: {
        id: string,
        username: string,
        email_verified: string,
        first_name: string,
        last_name: string,
        email: string,
        about: string,
        photo: string,
        password: string,
        id: string,
        created_at: string,
        updated_at: string,
    },
    likes: [
        {
            id: string,
            user_id: string,
            piu_id: string,
            user: {
                id: string,
                username: string,
                email_verified: string,
                first_name: string,
                last_name: string,
                email: string,
                about: string,
                photo: string,
                password: string,
                id: string,
                created_at: string,
                updated_at: string,
            }
        }
    ]
  }
]
```

### POST /piu/like

Dar like ou unlike em um piu

Request
```
{
    piu_id: string
}
```

Response
```
{
    operation: string
}
```

\* A _operation_ pode ser "like" ou "unlike"

---

### Possíveis melhorias na API

- Refactor do envio de email de verificação
- Corrigir responses para não retornar dados sensíveis