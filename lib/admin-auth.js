export function checkAdmin(req) {
  const pwd = req.headers.get('x-admin-password');
  return process.env.ADMIN_PASSWORD && pwd === process.env.ADMIN_PASSWORD;
}

export function requireAdmin(req) {
  if (!checkAdmin(req)) {
    return Response.json({ error: 'Non autorisé' }, { status: 401 });
  }
  return null;
}
