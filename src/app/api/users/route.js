import { query } from "@/lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM users ORDER BY id DESC ",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {

    try {
        const { name,email } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO users (name,email) VALUES (?,?)",
            values: [name,email],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const users = {
            name:name,
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: users
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: request
        }));
    }
}

export async function PUT(request) {
    const { id, email,name } = await request.json();
        const updateProducts = await query({
            query: "UPDATE users SET email = ?,name = ?,WHERE id = ?",
            values: [email,name, id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    // try {
    //     const { id, email } = await request.json();
    //     const updateProducts = await query({
    //         query: "UPDATE users SET email = ? WHERE id = ?",
    //         values: [email, id],
    //     });
    //     const result = updateProducts.affectedRows;
    //     let message = "";
    //     if (result) {
    //         message = "success";
    //     } else {
    //         message = "error";
    //     }
    //     const product = {
    //         id: id,
    //         email: email,
    //     };
    //     return new Response(JSON.stringify({
    //         message: message,
    //         status: 200,
    //         product: product
    //     }));
    // } catch (error) {
    //     return new Response(JSON.stringify({
    //         status: 500,
    //         data: res
    //     }));
    // }

}


export async function DELETE(request) {

    try {
        const { id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM users WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}