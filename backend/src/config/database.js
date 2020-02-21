module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  port: '5435',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
