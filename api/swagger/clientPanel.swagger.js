/**
 * @swagger
 * components:
 *   schemas:
 *     ClientPanelSummary:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *         data:
 *           type: string
 */

/**
 * @swagger
 * /atividades/{userId}:
 *   get:
 *     summary: Últimas atividades do usuário
 *     tags: [ClientPanel]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista com as últimas atividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientPanelSummary'
 */

/**
 * @swagger
 * /consultas/ultimas/{userId}:
 *   get:
 *     summary: Última consulta do usuário
 *     tags: [ClientPanel]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Última consulta retornada
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Lista agendamentos do usuário
 *     tags: [ClientPanel]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *   post:
 *     summary: Cria agendamento
 *     tags: [ClientPanel]
 */

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza agendamento
 *     tags: [ClientPanel]
 *   delete:
 *     summary: Deleta agendamento
 *     tags: [ClientPanel]
 */

/**
 * @swagger
 * /historico/{userId}:
 *   get:
 *     summary: Histórico de agendamentos do usuário
 *     tags: [ClientPanel]
 */

/**
 * @swagger
 * /prontuario/{userId}:
 *   get:
 *     summary: Retorna o prontuário do usuário
 *     tags: [ClientPanel]
 */

/**
 * @swagger
 * /notificacoes/{userId}:
 *   get:
 *     summary: Lista notificações do usuário
 *     tags: [ClientPanel]
 * /notificacoes/{id}/lida:
 *   put:
 *     summary: Marca notificação como lida
 *     tags: [ClientPanel]
 */
