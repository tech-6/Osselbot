import 'dart:async';
import 'dart:math';

import 'package:nyxx/nyxx.dart';
import 'package:nyxx_interactions/interactions.dart';
import 'package:nyxx_commander/commander.dart';
import 'package:osselbot/config.dart';
// import 'package:path/path.dart';

void main(List<String> arguments) {
  final bot = Nyxx(Config['token'] as String, 32511);
  bot.onReady.listen((event) {
    randomStatus(bot);
  });

  // Change the Activity every 5 minutes
  Timer.periodic(Duration(minutes: 5), (timer) => randomStatus(bot));

  Interactions(bot)
    ..registerSlashCommand(SlashCommandBuilder(
      'test',
      'test command',
      [],
    )..registerHandler(testSlashCommand))
    ..syncOnReady();

  Commander(bot, prefix: '?')
    ..registerCommand(
        'ping',
        (context, message) => {
              context.reply(
                  content: 'pong! ' +
                      bot.shardManager.shards
                          .elementAt(context.shardId)
                          .gatewayLatency
                          .inMilliseconds
                          .toString() +
                      'ms')
            })
    ..registerCommand('info', (context, message) async {
      await context.sendMessage(
          embed: await infoCommand(bot, context, message));
    });
}

Future<EmbedBuilder> infoCommand(
    Nyxx bot, CommandContext context, String message) async {
  var member = await context.guild?.fetchMember(bot.self.id);

  var color = getColor(member ??= context.guild?.selfMember);
  var iconUrl = bot.self.avatarURL();

  return EmbedBuilder()
    ..addField(
        name: 'ping',
        content: bot.shardManager.shards
                .elementAt(context.shardId)
                .gatewayLatency
                .inMilliseconds
                .toString() +
            'ms',
        inline: true)
    ..addAuthor((author) {
      author.iconUrl = iconUrl;
      author.name = bot.self.username;
    })
    ..color = color; // ??= DiscordColor.blue
}

DiscordColor getColor(Member? member) {
  if (member == null) return DiscordColor.black;
  member.roles.forEach((element) async {
    await element.getOrDownload();
  });

  var colorRole = member.roles.firstWhere((element) {
    if (element.getFromCache()?.color == null) return false;
    return element.getFromCache()?.color != DiscordColor.none;
  });
  return colorRole.getFromCache()!.color;
}

void randomStatus(Nyxx bot) {
  var rand = Random();
  var statuses = Config['statuses'] as List<String>;

  bot.setPresence(PresenceBuilder.of(
      status: UserStatus.dnd,
      game: Activity.of(statuses[rand.nextInt(statuses.length - 1)])));
}

Future<void> testSlashCommand(InteractionEvent event) async {
  await event.acknowledge();

  await event.respond(content: 'hello, world');
}
