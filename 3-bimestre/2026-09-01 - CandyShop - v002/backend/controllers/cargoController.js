const { query } = require('../database');

// Listar todos os cargos
exports.listarCargos = async (req, res) => {
    try {
        const result = await query('SELECT * FROM public.cargo ORDER BY id_cargo');
        res.json({ sucesso: true, cargos: result.rows });
    } catch (error) {
        console.error('Erro ao listar cargos:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar cargos.' });
    }
};

// Obter cargo por ID (chave primária é texto, ex: "GERENTE")
exports.obterCargo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
        }

        const result = await query('SELECT * FROM public.cargo WHERE id_cargo = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Cargo não encontrado.' });
        }

        res.json({ sucesso: true, cargo: result.rows[0] });
    } catch (error) {
        console.error('Erro ao obter cargo:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
    }
};

// Criar cargo
exports.criarCargo = async (req, res) => {
    try {
        const { id_cargo, nome_cargo } = req.body;

        if (!id_cargo || !nome_cargo) {
            return res.status(400).json({ sucesso: false, mensagem: 'O ID e o nome do cargo são obrigatórios.' });
        }

        const sql = `
            INSERT INTO public.cargo (id_cargo, nome_cargo)
            VALUES ($1, $2)
            RETURNING *
        `;

        const values = [id_cargo, nome_cargo];

        const result = await query(sql, values);
        res.status(201).json({ sucesso: true, mensagem: 'Cargo inserido com sucesso!', cargo: result.rows[0] });
    } catch (error) {
        console.error('Erro ao criar cargo:', error);
        if (error.code === '23505') {
            return res.status(400).json({ sucesso: false, mensagem: 'Já existe um cargo com esse ID.' });
        }
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir cargo no banco de dados.' });
    }
};

// Atualizar cargo
exports.atualizarCargo = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_cargo } = req.body;

        const sql = `
            UPDATE public.cargo 
            SET nome_cargo = $1
            WHERE id_cargo = $2
            RETURNING *
        `;

        const values = [nome_cargo, id];

        const result = await query(sql, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Cargo não encontrado.' });
        }

        res.json({ sucesso: true, mensagem: 'Cargo alterado com sucesso!', cargo: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar cargo:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar cargo.' });
    }
};

// Deletar cargo
exports.deletarCargo = async (req, res) => {
    try {
        const id = req.params.id;

        await query('DELETE FROM public.cargo WHERE id_cargo = $1', [id]);

        res.json({ sucesso: true, mensagem: 'Cargo excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar cargo:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir cargo.' });
    }
};